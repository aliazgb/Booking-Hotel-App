import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { UseHotels } from "../../Context/HotelsProvider";
function LayOut() {
  const { hotels } = UseHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocation={hotels}/>
      </div>
    </div>
  );
}

export default LayOut;
