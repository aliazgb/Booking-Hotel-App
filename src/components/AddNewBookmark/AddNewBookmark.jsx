import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useReserve } from "../../Context/ReservProvider";
import useUrlLocation from "../../hook/useUrlLocation";
import { calculateFinalPrice } from "../../utils/utils";
import Loader from "../Loader/Loader";
import {useGeocode} from "../../hook/useGeocode"
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const { createBookmark } = useBookMark();
  const [searchParams, setSearchParams] = useSearchParams();
  const price = searchParams.get("price");
  const { option, setBookmarkedPlaces, date, setDate, setOpenDate } =
    useReserve();

  const { cityName, country, countryCode, isLoadingGeoCoding, geoCodingError } =
    useGeocode(lat, lng);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { differenceInDays, finalPrice } = calculateFinalPrice(
      date[0].startDate,
      date[0].endDate,
      price
    );
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      id: Date.now(),
      date,
      host_location: cityName + " " + country,
      price,
      finalPrice,
      option,
      differenceInDays,
    };
    if (differenceInDays == 0) {
      return setOpenDate(true);
    }
    createBookmark(newBookmark);
    setBookmarkedPlaces((prevKos) => [...prevKos, newBookmark]);
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    navigate(`${price ? "/bookmark" : "/hotels"}`);
  };

  if (isLoadingGeoCoding) {
    return <Loader />;
  }
  if (geoCodingError) {
    return <p>{geoCodingError}</p>;
  }
  return (
    <div className="m-1">
      <h2 className="font-bold sm:text-xl my-8">Bookmark New Location</h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <label className="mb-4" htmlFor="cityName">
            CityName
          </label>
          <input
            className="input-field p-2 my-2"
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="relative">
          <label htmlFor="countryName">CountryName</label>
          <input
            className="input-field p-2 my-2"
            type="text"
            name="cityName"
            id="CountryName"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag
            className="absolute top-[55%] right-4"
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="btn-secondary py-2 px-4"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            back
          </button>
          <button className="btn-primary py-2 px-4">add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
