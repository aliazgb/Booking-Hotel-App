import React, { useEffect, useState } from "react";
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
    <div className="mapContainer">
      <button className="getLocation" onClick={getPosition}>
        Use Your Location
      </button>

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
        <DetectClick />
        <ChangeCenter position={center} />
        {markerLocation.map((item) => (
          <Marker
            key={item.id}
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
