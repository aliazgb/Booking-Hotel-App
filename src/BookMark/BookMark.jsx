import React from "react";
import Map from "../components/Map/Map";
function BookMark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
      </div>
      <div className="mapContainer">
        <Map markerLocation={[]}/>
      </div>
    </div>
  );
}

export default BookMark;
