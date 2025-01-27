import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UseHotels } from "../../Context/HotelsProvider";
import useFetch from "../../hook/useFetch";
import { useSearchParams } from "react-router-dom";
function Map() {
  const { isloading, hotels } = UseHotels();
  const [position, setPosition] = useState([53, -3]);
  const lat =useSearchParams("lat")
  const lng =useSearchParams("lng")
  console.log(hotels)

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[lat,lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
