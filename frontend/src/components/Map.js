import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

import { loading } from '../util/loadingAnimation';

const mapStyles = {
  height: '80vh',
  width: '80%',
  padding: '10px',
  top: '5vh',
  left: '5%',
  border: '10vh',
};

const Map = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCsaB0ULoGPak8Jov3prGhtpnlCvRugJig',
  });

  const myPos = {
    lat: lat,
    lng: lng,
  };

  return loading({
    loaded: isLoaded,
    element: (
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={myPos}>
        <MarkerF position={myPos} />
      </GoogleMap>
    ),
  });
};
export default Map;
