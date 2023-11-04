import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

import List from "./list/List";
import MapLayers from "./mapLayers/MapLayers";
import Airports from "./airports/Airports";
import Cities from "./cities/Cities";
import BasicDataBtn from "./buttons/BasicDataBtn";

const API_BASE = "http://localhost:3001";

const Map = (props) => {
  // Getting country data for select
  const [countryData, setCountryData] = useState(null);

  const getCountries = async () => {
    const data = await fetch(`${API_BASE}/country-data`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
      })
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    getCountries();
  }, []);

  // Getting the border
  const [geoJsonData, setGeoJsonData] = useState(null);

  const borderHandler = (x) => {
    setGeoJsonData(x);
  };


// ------- Airports ---------- //

  const [airports, setAirports] = useState(null)

  // Getting Airport data //
  const airportsHandler = async (countryCode) => {
    let data = await fetch(`${API_BASE}/airport-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode: countryCode,
      }),
    })
      .then((res) => res.json())
      .catch(e => console.error('Error', e))
      setAirports(data);
  };




  // ------- Cities ---------- //

const [cities, setCities] = useState(null);

  // Getting City data //
  const citiesHandler = async (countryCode) => {

    let data = await fetch(`${API_BASE}/city-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode: countryCode
      }),
    })
    .then((res) => res.json())
    .catch(e => console.error('Error',e))

    setCities(data);
  }




  return (
    <>
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} minZoom={1}>
      <BasicDataBtn geoJsonData={geoJsonData} />
        <List
          borderHandler={borderHandler}
          countryData={countryData}
          getAirports={airportsHandler}
          getCities={citiesHandler}
        />
        <MapLayers />
        < Airports airports={airports} />
        < Cities cities={cities} />
        <GeoJSON
          data={geoJsonData}
          key={JSON.stringify(geoJsonData)}
          style={{
            color: "red",
            weight: 1,
            opacity: 1,
          }}
        />
      </MapContainer>
    </>
  );
};

export default Map;
