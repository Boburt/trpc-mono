"use client";
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapYandex = () => (
  <YMaps
    query={{
      ns: "use-load-option",
      load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
    }}
  >
    <Map
      defaultState={{
        center: [41.311158, 69.279737],
        zoom: 15,
        controls: ["zoomControl", "fullscreenControl"],
      }}
      width="100%"
      height="500px"
    >
      <Placemark defaultGeometry={[41.311158, 69.279737]} />
    </Map>
  </YMaps>
);

export default MapYandex;
