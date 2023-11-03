import React from 'react'
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { Icon } from "leaflet"

const Airports = (props) => {

  // Creating airport icon 
  const airportIcon = new Icon({
    iconUrl: require('../../../../assets/airport2.png') ,
    iconSize: [38,38],
  })


  return (
    <MarkerClusterGroup>
    {props.airports ?  props.airports.map(e => (
      <Marker position={[e.lat, e.lng]} icon={airportIcon} key={e.key} >
        <Popup> <h4>{e.name}</h4> </Popup>
      </Marker>
    )) : ''}
    </MarkerClusterGroup>
  )
}

export default Airports