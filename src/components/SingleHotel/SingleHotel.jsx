import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { UseHotels } from "../../Context/HotelsProvider";
function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingHotel, dataHotel } = UseHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingHotel) {
    return <Loader />;
  }
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{dataHotel.name}</h2>
        <div>{dataHotel.number_of_reviews}</div>
        <img src={dataHotel.xl_picture_url} alt={dataHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
