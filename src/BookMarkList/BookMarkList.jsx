import React from "react";
import { useBookMark } from "../Context/BookMarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
function BookMarkList() {
  const { bookmarks, currentBookMark } = useBookMark();
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id == currentBookMark?.id ? "current-bookmark" : ""}`}
                key={item.id}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookMarkList;
