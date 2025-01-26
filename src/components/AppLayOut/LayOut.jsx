import React from "react";
import { Outlet } from "react-router-dom";

function LayOut() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet/>
      </div>
      <div className="mapContainer">map</div>
    </div>
  );
}

export default LayOut;
