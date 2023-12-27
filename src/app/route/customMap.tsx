import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import PolylineDecoder from 'polyline';

const polylineStyling = [
  { // Styling for transit, is rendered first
    strokeColor: '#FFA000',
    strokeOpacity: 1,
    strokeWeight: 4,
  },
  { // Styling for drive
    strokeColor: '#F44336',
    strokeOpacity: 1,
    strokeWeight: 3.5,
  },
  { // Styling for bicycle
    strokeColor: '#0E53FF',
    strokeOpacity: 1,
    strokeWeight: 3,
  },
  { // Styling for walk, is rendered last
    strokeColor: '#BCCEFB',
    strokeOpacity: 1,
    strokeWeight: 2.5,
  },
];

export default function MapComponent(props: any) {

  if (!Array.isArray(props.encodedPolylines)) {
    alert("Non-array passed to MapComponent!")
  }

  const polylines = props.encodedPolylines;
  console.log("Number of polylines to draw: " + polylines.length)

  const [map, setMap] = useState<any>(null);
  const decodedPaths = [];
  const pathsAsCoords = [];

  polylines.forEach((polyline: any) => {
    decodedPaths.push(PolylineDecoder.decode(polyline));
  });
  
  decodedPaths.forEach((decodedPath) => {
    pathsAsCoords.push(decodedPath.map((coord) => ({ lat: coord[0], lng: coord[1] })))
  });

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPaths[0].forEach((coord: number[]) => {
        bounds.extend(new window.google.maps.LatLng(coord[0], coord[1]));
      });

      map.fitBounds(bounds);
    }
  }, [map, props.encodedPolylines]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const startPosition = {
    lat: decodedPaths[0][0][0],
    lng: decodedPaths[0][0][1],
  };

  const endPosition = {
    lat: decodedPaths[0][decodedPaths[0].length - 1][0],
    lng: decodedPaths[0][decodedPaths[0].length - 1][1],
  };

  function polylineRendering(pathAsCoords:any, index:number) {
    return (
      <Polyline
      key={index}
      path={pathAsCoords}
      options={polylineStyling[index]}
    />
    );
  }

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {pathsAsCoords.map(polylineRendering)}

        {/* Marker for the start position */}
        <Marker
          position={startPosition}
          label="A"
          animation={google.maps.Animation.DROP}
          />


        {/* Marker for the end position */}
        <Marker 
          position={endPosition}
          label="B"
          animation={google.maps.Animation.DROP}

        />
      </GoogleMap>
  );
}
