import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { UseHotels } from "../../Context/HotelsProvider";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import useUrlLocation from "../../hook/useUrlLocation";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingHotel, dataHotel } = UseHotels();
 const [lat, lng]= useUrlLocation()
  const star = dataHotel.number_of_reviews || 0;
  const navigate = useNavigate();
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
          <button>Book Now </button>
          {/* onClick={()=>navigate(`/bookmark/add?lat=${lat}&lng=${lng}`) */}
          <Link to={"/hotels/"}>
            <button>← Back</button>
          </Link>
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
