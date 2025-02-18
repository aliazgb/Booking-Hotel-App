import React, { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarkProvider";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoading, currentBookMark } = useBookMark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoading || !currentBookMark) return <Loader />;

  return (
    <div className="w-[80%]">
      <button
        className="btn-secondary text-sm sm:text-xl py-2 px-4 my-8"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <h2 className="mb-2 text-sm sm:text-xl">{currentBookMark.cityName}</h2>
      <div
        className="text-sm sm:text-xl border-1 border-indigo-400 mb-4 rounded-lg p-2 sm:p-4
        flex items-center justify-between      
      "
      >
        <ReactCountryFlag svg countryCode={currentBookMark.countryCode} />{" "}
        &nbsp;
        <strong>{currentBookMark.cityName}</strong> &nbsp;
        <span>{currentBookMark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
