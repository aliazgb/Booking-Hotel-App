import { useSearchParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const desti = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${desti || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Results({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
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
