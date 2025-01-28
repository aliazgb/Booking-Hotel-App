import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UseHotels } from "../../Context/HotelsProvider";
import useFetch from "../../hook/useFetch";
import { useSearchParams } from "react-router-dom";
function Map() {
  const { isloading, hotels } = UseHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[lat || 9, lng || 8]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={[lat || 9, lng || 8]} />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude || 53, item.longitude || 8]}>
              <Popup>
               {item.host_location}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
export default Map;
