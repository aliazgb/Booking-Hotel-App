import React from "react";
import useUrlLocation from "../../hook/useUrlLocation";
import { useNavigate } from "react-router-dom";

function AddNewBookmark() {
    const navigate=useNavigate()
  const [lat, lng] = useUrlLocation();
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">CountryName</label>
          <input type="text" name="cityName" id="CountryName" />
        </div>
        <div className="buttons">
          <button className="btn btn--back">back</button>
          <button
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault();
              navigate(``)
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
