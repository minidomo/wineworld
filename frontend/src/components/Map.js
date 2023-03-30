import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React from 'react';

const Map = ({ lat, lng }) => {
  const mapStyles = {
    height: '80vh',
    width: '80%',
    padding: '10px',
    top: '10vh',
    left: '10%',
    border: '10vh',
  };

  // Const defaultCenter = {
  // lat: -3.745, lng: -38.523, zoom: 12
  // }

  const myPos = {
    lat: lat,
    lng: lng,
  };

  return (
    // <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <LoadScript googleMapsApiKey="AIzaSyCsaB0ULoGPak8Jov3prGhtpnlCvRugJig">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={myPos}>
        <MarkerF position={myPos} />
      </GoogleMap>
    </LoadScript>
  );
};
export default Map;
