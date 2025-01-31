import React from "react";
import Map from "../components/Map/Map";
import { Outlet } from "react-router-dom";
import { useBookMark } from "../Context/BookMarkProvider";
function BookMark() {
  const {bookmarks}=useBookMark()
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocation={bookmarks}/>
      </div>
    </div>
  );
}

export default BookMark;
