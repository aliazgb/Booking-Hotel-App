import React, { useEffect } from "react";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate()
  const { getBookmark, isLoadingCurrentBookmark, currentBookMark } =
    useBookMark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrentBookmark || !currentBookMark) return <Loader />;

  return (
    <div>
        <button className="btn btn--back" onClick={()=>navigate(-1)}>&larr; Back</button>
      <h2>{currentBookMark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookMark.countryCode}/> &nbsp;
        <strong>{currentBookMark.cityName}</strong> &nbsp;
        <span>{currentBookMark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
