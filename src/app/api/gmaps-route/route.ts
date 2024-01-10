
const API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

type RouteParams = {
    origin: object,
    destination: object,
    travelMode: string,
}

export async function POST(request:any) {
    try {
        const requestData: RouteParams = await request.json()
        // console.log("Request received in route.ts:", requestData);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.NEXT_PUBLIC_ROUTES_API_KEY,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
            },
            body: JSON.stringify(requestData),
        });

        // Check if the response status is OK (200)
        if (response.ok) {
            // Parse the response from the Google Maps API
            const googleData = await response.json();
    
            // Return the parsed data as the response to the original request
            return Response.json(googleData);
        } else {
            // If the response status is not OK, handle the error
            console.error('Error in route.ts:', response.statusText);
            return new Response('Internal Server Error', { status: 500 });
        }
    } catch (error) {
        // Handle other types of errors (e.g., JSON parsing error)
        console.error('Error in route.ts:', error);
        return new Response('Bad Request', { status: 400 });
    }
}