import React from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import numeral from "numeral";

const Cities = (props) => {

    const cityIcon = new Icon({
        iconUrl: require('../../../assets/cities.png') ,
        iconSize: [38,38],
      })


  return (
    <MarkerClusterGroup>
    {props.cities && props.cities.map(e => (
      <Marker position={[e.lat, e.lng]} icon={cityIcon} key={e.key} >
        <Popup> <h5>{e.name}</h5> 
        <h6>{`Population: ${numeral(e.population).format('0,0')}`}</h6></Popup>
      </Marker>
    ))}
    </MarkerClusterGroup>
  )
};
export default Cities;
