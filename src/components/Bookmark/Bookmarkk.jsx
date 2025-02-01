import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarkProvider";
function BookMarkLayOut() {
  const { bookmarks } = useBookMark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocation={bookmarks} />
      </div>
    </div>
  );
}

export default BookMarkLayOut;
