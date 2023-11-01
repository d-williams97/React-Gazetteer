import React from "react";
import { useState, useEffect } from "react";
import styles from "./List.module.css";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_BASE = "http://localhost:3001";

const List = (props) => {
  const [countryData, setCountryData] = useState(null);
  let countryCode;
  let countryName;
  let countryBorder;

  //get data
  useEffect(() => {
    // For getting country data
    getCountries();
  }, []);

  // Getting country data for select
  const getCountries = async () => {
    const data = await fetch(`${API_BASE}/country-data`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
      })
      .catch((err) => console.error("Error: ", err));    
  }

const changeCountryHandler = (value) => {
    let selectedCountry = countryData.find(country => country.properties.iso_a2 === value);
    countryName = selectedCountry.properties.name;
    countryCode = value;
    props.borderHandler(selectedCountry);
    props.getBoundsHandler(countryName);
}





  return (
    <div className={styles.list}>
      <Form.Select aria-label="Default select example" onChange={(e) => {
        changeCountryHandler(e.target.value);
     
      }}>
        {countryData && countryData.map(country => (
        <option value={country.properties.iso_a2} key={country.key}>{country.properties.name}</option>
      ))}
   </Form.Select>
    </div>
  );
};

export default List;
