import React from "react";
import { Outlet } from "react-router-dom";
import { UseHotels } from "../../Context/HotelsProvider";
import Map from "../Map/Map";
function LayOut() {
  const { hotels } = UseHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="relative h-screen flex-1 bg-text-100">
        <Map markerLocation={hotels} />
      </div>
    </div>
  );
}

export default LayOut;
