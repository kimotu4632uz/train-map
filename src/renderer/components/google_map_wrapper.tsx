import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';

type GoogleMapWrapperProps = {
  importGeoJsonFlag: boolean;
};

export const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({ importGeoJsonFlag }) => {
  const firstRender = useRef(true);
  const [raw_map, setMap]: [any, React.Dispatch<React.SetStateAction<any>>] = useState();

  useEffect(() => {
    const importGeojson = async () => {
      console.log('flag');
      const result = await window.api.fetchRailInfo('RailroadGeoJson');
      if (!result) return;
      raw_map.data.addGeoJson(result);
    };

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      importGeojson();
    }
  }, [importGeoJsonFlag]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAC2UHZm7RCGQDCvgxqhPiwYsQs55dQceM' }}
      defaultCenter={{ lat: 35.681151, lng: 139.7663254 }}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map}) => setMap(map)}
    />
  )
}