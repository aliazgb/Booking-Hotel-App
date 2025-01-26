import { useSearchParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const desti = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${desti || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) return <Loader />;
  return <div>{data.length}adad</div>;
}

export default Hotels;
