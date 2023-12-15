import { API_KEY } from "./mapsAPIConfig";

const API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

export default async function getRoute(requestData: any) {
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

    const routeData = await response.json();
    // Handle the response data here
    return routeData;
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
}