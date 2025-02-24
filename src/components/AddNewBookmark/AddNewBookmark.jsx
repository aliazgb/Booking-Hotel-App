import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReserve } from "../../Context/ReservProvider";
import useUrlLocation from "../../hook/useUrlLocation";
import Loader from "../Loader/Loader";
import { useBookMark } from "../../Context/BookMarkProvider";
const BASE_GEOCODING_URL =
  "https://us1.api-bdc.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const price = searchParams.get("price");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);
 const {createBookmark}= useBookMark()
  const [isLoadingGeoCoding, setIsLoadingGeoCoding, priceof] = useState(false);
  const {
    option,
    finalPrice,
    setBookmarkedPlaces,
    date,
    setDate,
    setOpenDate,
  } = useReserve();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        setCityName(data.city);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        if (!data.countryCode) {
          throw new Error("✖ this location is not a city ! ✖");
        }
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const differenceInDays = Math.floor(
      (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24) *price
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
      finalPrice:differenceInDays,
      option,
    };
    const dateDifference = date[0].endDate - date[0].startDate;
    if (dateDifference == 0) {
      return setOpenDate(true);
    }

    // navigate(`/bookmark/add?lat=${lat}&lng=${lng}`);
    createBookmark(newBookmark)
    setBookmarkedPlaces((prevKos) => [...prevKos, newBookmark]);
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    navigate(`${price?"/bookmark":"/hotels"}`);
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
