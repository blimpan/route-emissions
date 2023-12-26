import { API_KEY } from "./mapsAPIConfig";

const API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";


export const routeModel = {
  origin: null,
  destination: null,
  travelMode: null,
  distanceM: null,
  durationS: null,

  getRoute: async function(requestData) {
    this.origin = requestData.origin;
    this.destination = requestData.destination;
    this.travelMode = requestData.travelMode;

    try {
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
      let routeObj = responseObj.routes[0];
      console.log(routeObj)

      this.distanceM = routeObj.distanceMeters;
      this.durationS = routeObj.duration;

      return routeObj;

    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  }
}