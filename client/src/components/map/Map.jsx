import React from "react";
import {useState} from 'react'
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import List from "./list/List";


const API_BASE = "http://localhost:3001";


const Map = (props) => {

  const [border, setBorder] = useState(null)


  const borderHandler = (x) => {
     setBorder(x);
  }

  // get data from openCageData to get boundary data 
  const getBoundsHandler = async (countryName) => {
    const data = await fetch (`${API_BASE}/bounds-data/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
        let boundsData = data.bounds;
        console.log(boundsData);
    })
    .catch((err) => console.error("Error: ", err))
}


  return (
    <>
     <List
     borderHandler={borderHandler} getBoundsHandler={getBoundsHandler} />
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    <GeoJSON data={border ? border : ''} key={JSON.stringify(border)}/>
      </MapContainer>
    </>
  );
};

export default Map;
