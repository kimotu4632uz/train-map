import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { railInfoStore } from '../../store';

type GoogleMapWrapperProps = {
  visibleList: Set<string>;
  importGeoJsonFlag: boolean;
};

export const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({ importGeoJsonFlag, visibleList }) => {
  const firstRender = useRef(true);
  const [raw_map, setMap] = useState<google.maps.Map | undefined>();

  useEffect(() => {
    const importGeojson = async () => {
      if (!raw_map) return;
      const info = railInfoStore.get_info()
      if (!info) return;
      const result = await window.api.fetchRailroad();
      if (!result) return;

      info.comp_list.map((comp, pidx) => {
        info.detail_list.map((detail, cidx) => {

        })
      })

      raw_map.data.addGeoJson(result);
      raw_map.data.setStyle({visible: false});
    };

    if (firstRender.current) {
      firstRender.current = false;
    } else {
      importGeojson();
    }
  }, [importGeoJsonFlag]);

  useEffect(() => {
  }, [visibleList])

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAC2UHZm7RCGQDCvgxqhPiwYsQs55dQceM' }}
      defaultCenter={{ lat: 35.681151, lng: 139.7663254 }}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map}) => setMap(map as google.maps.Map)}
    />
  )
}