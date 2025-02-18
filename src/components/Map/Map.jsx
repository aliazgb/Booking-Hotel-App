import React, { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUserLocation from "../../hook/useUserLocation";
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
function Map({ markerLocation }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [center, setCenter] = useState([50, 12]);
  const {
    isloading: locationIsLoading,
    position,
    error,
    getPosition,
  } = useUserLocation();


  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(() => {
    if (lat && lng) {
      setCenter([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (position?.lat) {
      setCenter([position.lat, position.lng]);
    }
  }, [position]);
  return (
    <div className="sm:h-screen h-[50%] flex-1 bg-text-100 relative">
      <button
        className="btn-primary px-2 py-1 text-xs font-bold absolute bottom-4 left-4 
        shadow-[0_0_10px_var(--primary-600)] z-[1000]"
        onClick={getPosition}
      >
        Use Your Location
      </button>

      <MapContainer
        className="h-screen"
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={center} />
        {markerLocation.map((item) => (
          <Marker
            key={item.id}
            icon={customIcon}
            position={[item.latitude || 50, item.longitude || 12]}
          >
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
export default Map;