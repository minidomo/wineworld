import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React from 'react';

const Map = ({ lat, lng }) => {
  const mapStyles = {
    height: '80vh',
    width: '80%',
    padding: '10px',
    top: '5vh',
    left: '5%',
    border: '10vh',
  };

  // Const defaultCenter = {
  // lat: -3.745, lng: -38.523, zoom: 12
  // }

  const myPos = {
    lat: lat,
    lng: lng,
  };

  console.log(myPos);
  console.log(window.google === undefined);
  return window.google === undefined ? (
    <LoadScript googleMapsApiKey="AIzaSyCsaB0ULoGPak8Jov3prGhtpnlCvRugJig">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={myPos}>
        <MarkerF position={myPos} />
      </GoogleMap>
    </LoadScript>
  ) : (
    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={myPos}>
      <MarkerF position={myPos} />
    </GoogleMap>
  );
};
export default Map;
