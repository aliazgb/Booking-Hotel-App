import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UseHotels } from "../../Context/HotelsProvider";
import { useSearchParams } from "react-router-dom";
import useUserLocation from "../../hook/useUserLocation";
function Map() {
  const { isloading, hotels } = UseHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const [center, setCenter] = useState([50, 12]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(() => {
    if (lat && lng) {
      setCenter([lat, lng]);
    }
  }, [lat, lng]);
  const {isloading:locationIsLoading ,position ,error , getPosition}=useUserLocation()
  return (
    <div className="mapContainer">
      <button className="getLocation" onClick={getPosition}>use Your Location</button>
      <MapContainer
        className="map"
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={center} />
        {hotels.map((item) => {
          return (
            <Marker
              key={item.id}
              position={[item.latitude || 50, item.longitude || 12]}
            >
              <Popup>{item.host_location}</Popup>
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
  return null;
}
export default Map;
