"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link"
import MapComponent from "./customMap";
import RouteForm from './routeForm';
import { API_KEY } from '../mapsAPIConfig';
import { Wrapper } from '@googlemaps/react-wrapper';
import { routeModel } from '../routeModel';


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
/*
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
*/


export default function RoutePage() {

  const [apiResponse, setApiResponse] = useState(null);
  
  async function queryApi(routeData) { // called via props.onSubmit in routeForm

    let requestData = {
      origin: {
        "address": routeData.start,
      },
      destination: {
        "address": routeData.destination,
      },
      travelMode: 'DRIVE',
      routingPreference: "TRAFFIC_AWARE",

      languageCode: 'en-US',
      units: 'METRIC',
    };


    const routeObj = await routeModel.getRoute(requestData)

    setApiResponse(routeObj);

  }

  return (
    <>
      <h1 className="text-2xl font-bold">Route Page</h1>
      <p><Link href="/">Link to Home Page</Link></p>
      <RouteForm onSubmit={queryApi}/>
      {apiResponse && (
        <div className="debug flex w-full justify-center">
          <div className="debug w-full sm:w-2/3 min-h-[450px]">
            <Wrapper apiKey={API_KEY}>
              <MapComponent encodedPolyline={apiResponse.polyline.encodedPolyline} />
            </Wrapper>
          </div>
        </div>
      )}
    </>
  )
}