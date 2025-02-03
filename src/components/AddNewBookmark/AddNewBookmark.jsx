import React, { useEffect, useState } from "react";
import useUrlLocation from "../../hook/useUrlLocation";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
const BASE_GEOCODING_URL =
  "https://us1.api-bdc.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
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
  if (isLoadingGeoCoding) {
    return <Loader />;
  }
  if (geoCodingError) {
    return <p>{geoCodingError}</p>;
  }
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input type="text" name="cityName" id="cityName" value={cityName} />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">CountryName</label>
          <input type="text" name="cityName" id="CountryName" value={country} />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
