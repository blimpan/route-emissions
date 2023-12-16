import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, LoadScript } from '@react-google-maps/api';
import PolylineDecoder from 'polyline';
import { API_KEY } from '../../../lib/mapsAPIConfig';

// Define libraries outside of the component
const myLibraries = ['geometry'];

export default function MapComponent(props: any) {

  const [map, setMap] = useState<any>(null);

  const decodedPath = PolylineDecoder.decode(props.encodedPolyline);
  const pathAsLatLng = decodedPath.map((coord) => ({ lat: coord[0], lng: coord[1] }));

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((coord: number[]) => {
        bounds.extend(new window.google.maps.LatLng(coord[0], coord[1]));
      });

      map.fitBounds(bounds);
    }
  }, [map, props.encodedPolyline]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const startPosition = {
    lat: decodedPath[0][0],
    lng: decodedPath[0][1],
  };

  return (
    <LoadScript 
      googleMapsApiKey={API_KEY}
      libraries={myLibraries as any}> {/* moved expression outside of function to get rid of warning in browser */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
}
