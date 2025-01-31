import Loader from "../Loader/Loader";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { UseHotels } from "../../Context/HotelsProvider";
import { useEffect, useState } from "react";
function Hotels() {
  const { isLoading, hotels, dataHotel } = UseHotels();
  const [para] = useSearchParams();
  const mang = para.get("id");
  const [off, setOFf] = useState(mang);
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Results({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                dataHotel.id == item.id || item.id == off ? "current-hotel" : ""
              }`}
            >
              <img src={item.xl_picture_url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
