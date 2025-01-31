import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { UseHotels } from "../../Context/HotelsProvider";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingHotel, dataHotel } = UseHotels();
  const star = dataHotel.number_of_reviews || 0;
  useEffect(() => {
    getHotel(id);
  }, [id]);
  const amenities = dataHotel.amenities || [];
  if (isLoadingHotel) {
    return <Loader />;
  }

  return (
    <div className="room">
      <div className="roomDetail">
        <img src={dataHotel.xl_picture_url} alt={dataHotel.name} />
        <div className="room-book">
          <button>Book Now</button>
        </div>
      </div>
      <div className="flex gap-1">
        <h4>{dataHotel.name}</h4>
      </div>
      <div>
        <ul>
          {amenities.map((s) => {
            return <li key={s}>{s}</li>;
          })}
        </ul>
        {"⭐".repeat(star)}
        {"☆".repeat(5 - star)}
      </div>
    </div>
  );
}

export default SingleHotel;
