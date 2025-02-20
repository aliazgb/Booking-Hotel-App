import React from "react";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useDate } from "../../Context/ReservProvider";

function BookMarkList() {
  const navigate = useNavigate();
  const { bookmarks, currentBookMark, deleteBookmark } = useBookMark();
  const { price, setPrice } = useDate();
  const { finalPrice, setOpenOption, openOption, setOption } = useDate();
  // const [option, setOption] = useDate();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
    setPrice(0);
  };
  
  const handlesetOption = async (e, id) => {
    e.preventDefault();
    setOpenOption(!openOption);
    const selectedBookmark = bookmarks.find((s) => s.id == id);
    setPrice(selectedBookmark.price);
    console.log(finalPrice)
   
  };
  return (
    <div className="w-full sm:w-[80%] m-2">
      <h2 className="my-4 text-lg sm:text-xl">Bookmark List</h2>
      <div className="mt-4">
        {bookmarks.map((item) => {
          const isCurrentBookmark = item.id === currentBookMark?.id;
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`text-sm sm:text-lg mb-4 border-1 border-gray-400 rounded-xl p-1 sm:p-4
                    flex items-center justify-between
                    ${
                      isCurrentBookmark
                        ? "border-2 border-indigo-600 bg-text-100"
                        : ""
                    }
                    sm:flex-row sm:space-x-4`}
              >
                <div className="mx-1">
                  <ReactCountryFlag
                    className=""
                    svg
                    countryCode={item.countryCode}
                  />
                  &nbsp; <strong className="">{item.cityName}</strong> &nbsp;
                  <span className="text-xs sm:text-lg">{item.country}</span>
                </div>
                <button onClick={(e) => handlesetOption(e, item.id)}>
             
                  <p>{item.finalPrice}</p>
                </button>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="text-rose-500 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
      <button
        className="btn-primary sm:py-2 sm:px-8 p-1 text-sm sm:text-lg"
        onClick={() => navigate("/hotels")}
      >
        Recommended ...
      </button>
    </div>
  );
}

export default BookMarkList;
