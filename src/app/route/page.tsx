"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link"
import MapComponent from "./customMap";
import RouteForm from './routeForm';
import { API_KEY } from '../mapsAPIConfig';
import { Wrapper } from '@googlemaps/react-wrapper';
import { routeModel } from '../routeModel';


export default function RoutePage() {

  const [apiResponse, setApiResponse] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(true);
  
  async function queryApi(formData) { // called via props.onSubmit in routeForm

    let requestData = {
      origin: {
        "address": formData.start,
      },
      destination: {
        "address": formData.destination,
      },
    };

    await routeModel.getRoute(requestData)
    if (routeModel.atleastOne) {
      setApiResponse(routeModel.getPolylines());
      setShowForm(false); 
    }
  }

  function onNewRoute() {
    setShowForm(true);
    setApiResponse(null);
  }

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className="debug flex flex-row gap-3 h-14">
        <h1 className="text-2xl font-bold">Route Page</h1>
        <p><Link href="/">Link to Home Page</Link></p>
      </div>
      {showForm && (
        <RouteForm onSubmit={queryApi}/>
      )}
      {apiResponse && (
        <div className="debug flex flex-col w-full h-full">
          <div className="debug flex w-full h-2/5">
            <Wrapper apiKey={API_KEY}>
                <MapComponent encodedPolylines={apiResponse} />
            </Wrapper>
          </div>
          <div className="debug flex">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab delectus nobis facere omnis possimus corrupti quo itaque cum illo nesciunt, perferendis obcaecati, quis porro, minus veniam qui sed repudiandae culpa.</p>
          </div>
          <div className='debug flex justify-center'>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
            onClick={onNewRoute}
            >
              New route
            </button>
          </div>
        </div>
      )}
    </div>
  )
}