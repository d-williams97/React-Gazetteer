import React from 'react';
import {
    TileLayer,
    LayersControl,
  } from "react-leaflet";
  import "leaflet/dist/leaflet.css";

  const MapLayers = () => {

    return (
        <LayersControl position="topright">
        <LayersControl.BaseLayer name="National Geographic Map" checked='true' >
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Jawg Terrain Map">
          <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=ZU4kLdGveFQWTTQMZZMGBaFHCVW1H7KgXGT1wBgrH7tc1FtUvJCblJnSOG50RcSE"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite Map">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    );

  };

  export default MapLayers;