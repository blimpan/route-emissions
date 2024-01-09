// import { API_KEY } from "./mapsAPIConfig";
let API_KEY = "";
try {
  const { LOCAL_API_KEY } = require('./mapsAPIConfig');
  API_KEY = LOCAL_API_KEY;
  console.log("Successfully imported API key from local file!");

} catch (error) {
  console.log("Could not import API key locally, checking Vercel environment.")
  try {
    API_KEY = process.env.ROUTES_API_KEY;
  } catch (error) {
    console.log("Could not get API key from Vercel, we're screwed.")
  }
}

export { API_KEY };

const API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

let transitRoute = {
  travelMode: "TRANSIT",
  distanceM: 0,
  durationS: 0,
  polyline: "",
  exists: false,
};
let driveRoute = {
  travelMode: "DRIVE",
  distanceM: 0,
  durationS: 0,
  polyline: "",
  exists: false,
};
let bicycleRoute = {
  travelMode: "BICYCLE",
  distanceM: 0,
  durationS: 0,
  polyline: "",
  exists: false,
};
let walkRoute = {
  travelMode: "WALK",
  distanceM: 0,
  durationS: 0,
  polyline: "",
  exists: false,
};

const CO2_BUS_PER_KM_IN_G = 25;
const CO2_CAR_PER_KM_IN_G = 167;
const CO2_BIKE_PER_KM_IN_G = 140;
const CO2_WALK_PER_KM_IN_G = 260;

// The estimated number of grams CO2 or CO2e per traveled kilometer by a typical passenger vehicle.
// Source: https://klimatsmartsemester.se/transportmedelsberakningar

export const routeModel = {
  origin: null,
  destination: null,
  atleastOne: false,

  routeObjects: [transitRoute, driveRoute, bicycleRoute, walkRoute],

  /**
   * Returns all the route objects with a truthy .exists attribute.
   * @returns {Array} Array of route objects.
   */
  getExistingRoutes: function() {
    const reducedArr = this.routeObjects.reduce((accumulator, currentObj) => {
      if (currentObj.exists) {
        accumulator.push(currentObj);
      }
      return accumulator
    }, []);
    return [...reducedArr];
  },

  /**
   * Returns a sorted array of the existing routes with highest emissions first, lowest last. 
   * @returns {Array} Array of route objects, highest emissions first, lowest last.
   */
  getRoutesByEmission: function() {
    const existingRoutes = this.getExistingRoutes();
    existingRoutes.sort((routeA, routeB) => this.getEmissions(routeB.travelMode) - this.getEmissions(routeA.travelMode));
    return existingRoutes;
  },

  /**
   * Calculates the estimated amount of CO2e the route would generate for the given mode of transportation.
   * @param {string} modeOfTransport A string. Either "TRANSIT" | "DRIVE" | "BICYCLE" | "WALK".
   * @returns {number} An amount of CO2e in grams.
   */
  getEmissions: function(modeOfTransport:string): number {

    const routeObj = this.getRouteObject(modeOfTransport);

    switch (modeOfTransport) {
      case "TRANSIT":
        return Math.round((routeObj.distanceM / 1000) * CO2_BUS_PER_KM_IN_G);
      case "DRIVE":
        return Math.round((routeObj.distanceM / 1000) * CO2_CAR_PER_KM_IN_G);
      case "BICYCLE":
        return Math.round((routeObj.distanceM / 1000) * CO2_BIKE_PER_KM_IN_G);
      case "WALK":
        return Math.round((routeObj.distanceM / 1000) * CO2_WALK_PER_KM_IN_G);
    }
  },

  /**
   * Goes through the route objects and returns the first one with a matching mode of transportation.
   * @param {string} modeOfTransport A string. Either 'TRANSIT' | 'DRIVE' | 'BICYCLE' | 'WALK'.
   * @returns {object} A route object.
   */
  getRouteObject: function (modeOfTransport:string): object {
    const routeObj = this.routeObjects.find(obj => obj.travelMode === modeOfTransport);

    if (routeObj) {
      return routeObj;
    }
    // If we somehow reach this part of the code, something went wrong.
    console.error("Something went wrong when getting a route object")
    return null
  },


  /**
   * Creates and returns an array of all the existing routeObjects' encoded polylines.
   * @returns {Array} An array of encoded polylines.
   */
  getPolylines(): Array<any> {
    return this.routeObjects.reduce((accumulator, currentObj) => {
      if (currentObj.exists) {  // Makes sure that we don't get the polyline of any non-existing route
        accumulator.push(currentObj.polyline);
      }
      return accumulator;
    }, []);
  },


  /**
   * Fetches the route(s) for all modes of transportation between the origin and destination using Google Maps API.
   * Updates the attributes of the model to reflect new data.
   * @param {object} requestData 
   */
  getRoute: async function(requestData) {

    this.atleastOne = false;

    await Promise.all(this.routeObjects.map(async (routeObj) => {  // Process all objects in parallel (according to some github post I found)
      try {

        requestData.travelMode = routeObj.travelMode;

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
          },
          body: JSON.stringify(requestData),
        });
    
        const responseObj = await response.json();

        // console.log(responseObj.routes[0])

        routeObj.distanceM = responseObj.routes[0].distanceMeters;
        routeObj.durationS = responseObj.routes[0].duration;
        routeObj.polyline = responseObj.routes[0].polyline.encodedPolyline;

        routeObj.exists = true;
        this.atleastOne = true;

      } catch (error) {
        // Handle errors here
        routeObj.exists = false;
        console.error('Error:', error);
      }
    }));
    if (!this.atleastOne) {
      alert("Something went wrong! Try going somewhere else. I've heard Siberia is nice this time of year.")
    } else {
      this.origin = requestData.origin;
      this.destination = requestData.destination;

      requestData.languageCode = "en-US"; // Add language code and units attribute to already existing object
      requestData.units = "METRIC";
    }
  }
}