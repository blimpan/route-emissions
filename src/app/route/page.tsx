"use client"

import React, { useState } from 'react';
import Link from "next/link"
import getRoute from "../../../lib/mapsSource";
import MapComponent from "./customMap";

/*
const requestData = {
  origin: {
    "address": "KTH Royal Institute of Technology, Brinellvägen 8, 114 28 Stockholm",
  },
  destination: {
    "address": "Karolinska Institute, Solnavägen 1, 171 77 Solna",
  },
  travelMode: 'WALK',
  
  // routingPreference: "TRAFFIC_AWARE",
  // routeModifiers: {
  //   "avoidHighways": false
  // },
  

  languageCode: 'en-US',
  units: 'METRIC',
};
*/

const requestData = {
  origin: {
    "address": "T-Centralen, 111 20 Stockholm",
  },
  destination: {
    "address": "Bangatan 1, 222 21 Lund",
  },
  travelMode: 'DRIVE',
  
  // routingPreference: "TRAFFIC_AWARE",
  // routeModifiers: {
  //   "avoidHighways": false
  // },
  

  languageCode: 'en-US',
  units: 'METRIC',
};

export default function RoutePage() {

  const [buttonPressed, setButtonPressed] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  
  async function onDoApiThing() {
    const responseData = getRoute(requestData);
    const response = await responseData;

    setApiResponse(response);
    setButtonPressed(true);

    console.log(response);
    // console.log(response.routes[0].polyline.encodedPolyline)
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Route Page</h1>
      <Link href="/">Link to Home Page</Link>
      <p></p>
      <button
      onClick={onDoApiThing}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click to do API thing
      </button>
      {buttonPressed && apiResponse && (
        <div className="debug flex w-full justify-center">
          <div className="debug w-1/2">
            <MapComponent encodedPolyline={apiResponse.routes[0].polyline.encodedPolyline} />
          </div>
        </div>
      )}
    </>
  )
}
