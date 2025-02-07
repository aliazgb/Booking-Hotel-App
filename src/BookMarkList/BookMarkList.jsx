import React from "react";
import { useBookMark } from "../Context/BookMarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link, useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
function BookMarkList() {
  const navigate =useNavigate()
  const { bookmarks, currentBookMark, deleteBookmark } = useBookMark();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  return (
    <div className="bmk">
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
                  item.id == currentBookMark?.id ? "current-bookmark" : ""
                }`}
                key={item.id}
              >
                <div>
                  {" "}
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
      <button className="btn btn--primary" onClick={()=>navigate("/hotels")}>Recommended ...</button>
    </div>
  );
}

export default BookMarkList;
