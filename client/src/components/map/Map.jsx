import React from "react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
} from "react-leaflet";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

import List from "./list/List";
import MapLayers from "./mapLayers/MapLayers";

const API_BASE = "http://localhost:3001";

const Map = (props) => {
  const [border, setBorder] = useState(null);
  console.log(border);

  const borderHandler = (x) => {
    setBorder(x);
  };

  return (
    <>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} minZoom={1} >
        <List borderHandler={borderHandler} border={border} />
        {/* <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    <MapLayers />
        <GeoJSON data={border ? border : ""} key={JSON.stringify(border)} style={{
          color:'red',
          weight: 1,
          opacity: 1,}
        } />
      </MapContainer>
    </>
  );
};

export default Map;
