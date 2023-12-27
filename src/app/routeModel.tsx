import { API_KEY } from "./mapsAPIConfig";

const API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";


let transitRoute = {
  travelMode: "TRANSIT",
  distanceM: null,
  durationS: null,
  polyline: null,
  exists: false,
};
let driveRoute = {
  travelMode: "DRIVE",
  distanceM: null,
  durationS: null,
  polyline: null,
  exists: false,
};
let bicycleRoute = {
  travelMode: "BICYCLE",
  distanceM: null,
  durationS: null,
  polyline: null,
  exists: false,
};
let walkRoute = {
  travelMode: "WALK",
  distanceM: null,
  durationS: null,
  polyline: null,
  exists: false,
};


export const routeModel = {
  origin: null,
  destination: null,
  atleastOne: false,

  routeObjects: [transitRoute, driveRoute, bicycleRoute, walkRoute],

  getPolylines() {
    return this.routeObjects.reduce((accumulator, currentObj) => {
      if (currentObj.exists) {  // Makes sure that we don't get the polyline of any non-existing route
        accumulator.push(currentObj.polyline);
      }
      return accumulator;
    }, []);
  },

  getRoute: async function(requestData) {

    this.atleastOne = false;
    this.origin = requestData.origin;
    this.destination = requestData.destination;

    requestData.languageCode = "en-US"; // Add language code and units attribute to already existing object
    requestData.units = "METRIC";

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

        console.log(responseObj.routes[0])

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
      alert("No possible route exists between these two locations! Go somewhere else.")
    }
  }
}