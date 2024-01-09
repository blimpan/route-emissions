"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link"
import MapComponent from "./customMap";
import RouteForm from './routeForm';
import { Wrapper } from '@googlemaps/react-wrapper';
import { routeModel, API_KEY } from '../routeModel';
import EmissionsInfo from './emissionsInfo';

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
      {showForm && (
        <RouteForm onSubmit={queryApi}/>
      )}
      {apiResponse && (
        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-1/3 max-h-[250px]">
            <Wrapper apiKey={API_KEY}>
                <MapComponent encodedPolylines={apiResponse} />
            </Wrapper>
          </div>
          <div className='flex w-full px-2 pt-2'>
            <EmissionsInfo/>
          </div>
          <div className='flex justify-center mt-2'>
            <button
            className="flex border border-british-green text-british-green font-semibold bg-off-white w-[140px] h-[40px] rounded-2xl drop-shadow-lg justify-center items-center
            hover:drop-shadow-custom-button hover:translate-y-[-1px] transition-transform"
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