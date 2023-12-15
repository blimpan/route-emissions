import React from 'react';
import { GoogleMap, Polyline, LoadScript } from '@react-google-maps/api';
import PolylineDecoder from 'polyline';
import { API_KEY } from '../../../lib/mapsAPIConfig';

export default function MapComponent(props:any) {
    
  const decodedPath = PolylineDecoder.decode(props.encodedPolyline);
  const pathAsLatLng = decodedPath.map(coord => ({ lat: coord[0], lng: coord[1] }));


  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };
  
  const position = {
    lat: decodedPath[0][0],
    lng: decodedPath[0][1],
  };
  

  return (
    <LoadScript
      googleMapsApiKey = {API_KEY}
      libraries={['geometry']}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center= {position}
        zoom={13}
      >
        <Polyline
          path={pathAsLatLng}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};