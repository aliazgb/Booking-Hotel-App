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
      <div className="relative h-screen flex-1 bg-text-100">
        <Map markerLocation={bookmarks} />
        
      </div>
    </div>
  );
}

export default BookMarkLayOut;
