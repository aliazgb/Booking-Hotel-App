import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseHotels } from "../../Context/HotelsProvider";
import useUrlLocation from "../../hook/useUrlLocation";
import Loader from "../Loader/Loader";
import { FaCheckCircle } from "react-icons/fa";
function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingHotel, dataHotel } = UseHotels();
  const [lat, lng] = useUrlLocation();
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
    <div className="justify-between gap-4 items-stretch m-3">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-4 h-auto md:h-[50%]">
        <img
          className="rounded-lg shadow-lg w-full md:w-1/2 object-cover"
          src={dataHotel.xl_picture_url}
          alt={dataHotel.name}
        />
      </div>
      <div className="my-2">
        {"⭐".repeat(star)}
        {"☆".repeat(5 - star)}
      </div>
      <div className="flex gap-1">
        <h4>{dataHotel.name}</h4>
      </div>
      <div>
        <h1 className="mt-8">Hotel facilities</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {amenities.map((s) => (
            <li
              key={s}
              className="flex items-center text-gray-700 px-4 py-1 sm:text-lg text-sm sm:py-2 rounded-lg mb-1 sm:mb-2"
            >
              <FaCheckCircle className="text-indigo-600 mr-2 sm:mr-6 text-lg" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-around w-full md:w-auto gap-4 sm:mt-8 mt-4">
        <button
          className="btn-primary justify-self-center self-center p-2 sm:px-5
            sm:py-2.5 text-sm"
          onClick={() => navigate(`/bookmark/add?lat=${lat}&lng=${lng}`)}
        >
          Book Now{" "}
        </button>
        <Link to={"/hotels/"}>
          <button className="btn-secondary text-sm p-2 sm:px-5 sm:py-2.5 sm:my-4 my-2">
            ← Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleHotel;
