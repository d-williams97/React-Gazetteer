import React from "react";
import { useState, useEffect } from "react";
import styles from "./List.module.css";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMap } from "react-leaflet";


const API_BASE = "http://localhost:3001";
let countryName;
let countryCode;

const List = (props) => {
  
    const map = useMap();

  const getBoundsHandler = async (countryName) => {
    const data = await fetch (`${API_BASE}/bounds-data/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
      let bounds = [Object.values(data.bounds.southwest), Object.values(data.bounds.northeast)];
      map.fitBounds(bounds);
    })
    .catch((err) => {
      console.error("Error: ", err)
    })
    return data;
}




// country change event //
const changeCountryHandler = async (value) => {
    let selectedCountry = props.countryData.find(country => country.properties.iso_a2 === value);
    countryName = selectedCountry.properties.name;
    countryCode = value;
    props.borderHandler(selectedCountry);
    props.getAirports(countryCode);
    
    // props.airport data so that 

    getBoundsHandler(countryName); // changes map view

 

}





  return (
    <div className={styles.list}>
      <Form.Select aria-label="Default select example" onChange={(e) => {
        changeCountryHandler(e.target.value);
     
      }}>
        {props.countryData && props.countryData.map(country => (
        <option value={country.properties.iso_a2} key={country.key}>{country.properties.name}</option>
      ))}
   </Form.Select>
    </div>
  );
};

export default List;
