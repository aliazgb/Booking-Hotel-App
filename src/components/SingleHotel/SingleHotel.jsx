import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseHotels } from "../../Context/HotelsProvider";
import { useReserve } from "../../Context/ReservProvider";
import useUrlLocation from "../../hook/useUrlLocation";
import Loader from "../Loader/Loader";
function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingHotel, dataHotel } = UseHotels();
  const [lat, lng] = useUrlLocation();
  const { setPrice } = useReserve();
  const star = dataHotel.number_of_reviews || 0;
  const navigate = useNavigate();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  const handleBookmark = () => {
    setPrice(dataHotel.price);
    navigate(`/bookmark/add?lat=${lat}&lng=${lng}&price=${dataHotel.price}`);
  };
  const amenities = dataHotel.amenities || [];
  if (isLoadingHotel) {
    return <Loader />;
  }

  return (
    <div className="justify-between gap-3 items-st retch m-3">
      <div className="grid grid-cols-3 grid-rows-2 h-28 sm:h-80 gap-3">
        <div className=" row-span-2 col-span-2">
          {" "}
          <img
            className="object-cover w-full h-full"
            src={dataHotel.xl_picture_url}
            alt={dataHotel.name}
          />
        </div>
        <div className=" row-span-1 col-span-1">
          {" "}
          <img
            className="w-full h-full object-cover"
            src={dataHotel?.extra_picture?.[0]}
            alt={dataHotel.name}
          />
        </div>
        <div className="row-span-1 col-span-1">
          {" "}
          <img
            className="w-full h-full object-cover"
            src={dataHotel?.extra_picture?.[1]}
            alt={dataHotel.name}
          />
        </div>
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
        <div>
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
      </div>
      <div className="flex items-center justify-around w-full md:w-auto gap-4 sm:mt-8 mt-4">
        <button
          className="btn-primary justify-self-center self-center p-2 sm:px-5
            sm:py-2.5 text-sm"
          onClick={handleBookmark}
        >
          Book Now
        </button>
        <Link to={"/hotels/"}>
          <button className="btn-secondary text-sm p-2 sm:px-5 sm:py-2.5 sm:my-4 my-2">
            ← Back
          </button>
        </Link>
      </div>
      {}
    </div>
  );
}

export default SingleHotel;
