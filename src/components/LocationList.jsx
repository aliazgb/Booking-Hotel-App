import { Link } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { Commet } from "react-loading-indicators";
import Loader, { MainLoader } from "./Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch(
    "https://server-1-ej86.onrender.com/hotels",
    ""
  );

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div className="locationItem">
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
    </div>
  );
}

export default LocationList;
