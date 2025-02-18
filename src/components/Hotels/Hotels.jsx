import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UseHotels } from "../../Context/HotelsProvider";
import Loader from "../Loader/Loader";
function Hotels() {
  const { isLoading, hotels, dataHotel } = UseHotels();
  const [para] = useSearchParams();
  const mang = para.get("id");
  const [off, setOFf] = useState(mang);
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="sm:text-xl text-sm">Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`flex flex-col md:flex-row p-3 gap-4 shadow-md rounded-xl transition-all duration-300 ${
                dataHotel.id == item.id || item.id == off
                  ? "border-2 border-indigo-600"
                  : ""
              }`}
            >
              <img
                className="w-full md:w-24 md:h-24 object-cover rounded-xl"
                src={item.xl_picture_url}
                alt={item.name}
              />
              <div className="flex flex-col text-center md:text-left text-sm sm:text-[15px] ">
                <p className="mb-1 font-medium">{item.smart_location}</p>
                <p className="mb-1 text-gray-500">{item.name}</p>
                <p className="mb-1 font-medium flex justify-center md:justify-start items-center">
                  €&nbsp;{item.price}&nbsp;
                  <span className="font-medium text-gray-800">night</span>
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
