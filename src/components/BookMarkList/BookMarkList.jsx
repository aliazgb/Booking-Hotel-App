import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FaEuroSign } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useReserve } from "../../Context/ReservProvider";
import BookmarkActions from "../BookmarkActions/BookmarkActions";
function BookMarkList() {
  const [current, setCurrent] = useState();
  const [selectId, setSelectID] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const navigate = useNavigate();
  const {
    setOpenOption,
    openOption,
    setOption,
    option,
    setPrice,
    bookmarkedPlaces,
    setBookmarkedPlaces,
    date,
    setDate,
    openDate,
    setOpenDate,
    getTotalBookingPrice,
  } = useReserve();

  useEffect(() => {
    if (!openOption && selectId !== null) {
      handleDoneifo(selectId);
      setSelectID(null);
    }
  }, [openOption]);

  const handleDoneifo = (id) => {
    const updateBookmarkedPlaces = bookmarkedPlaces.map((f) =>
      f.id === id
        ? {
            ...f,
            option: {
              adult: option.adult,
              children: option.children,
              room: option.room,
            },
          }
        : f
    );

    setBookmarkedPlaces(updateBookmarkedPlaces);
    getTotalBookingPrice(updateBookmarkedPlaces, id);
  };

  const handleDoneDate = (id) => {
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const editDate = date;
    const updateBookmarkedPlaces = bookmarkedPlaces.map((f) =>
      f.id === id
        ? {
            ...f,
            date: editDate,
          }
        : f
    );
    setBookmarkedPlaces(updateBookmarkedPlaces);
    getTotalBookingPrice(updateBookmarkedPlaces, id);
  };

  useEffect(() => {
    if (!openDate && selectedDateId !== null) {
      handleDoneDate(selectedDateId);
      setSelectedDateId(null);
    }
  }, [openDate]);

  const handleEditPerson = (e, id) => {
    e.preventDefault();
    const selected = bookmarkedPlaces.find((s) => s.id === id);
    if (selected) {
      setOption(selected.option);
      setPrice(selected.price);
      setSelectID(id);
      setOpenOption(true);
    }
  };

  const handleEditDate = (id) => {
    setOpenDate(true);
    setSelectedDateId(id);
  };
  const handleDelete = (id) => {
    const reserveDelete = bookmarkedPlaces.filter((f) => f.id !== id);
    setBookmarkedPlaces(reserveDelete);
  };

  const totalPrice = bookmarkedPlaces.reduce(
    (acc, item) => acc + item.finalPrice,
    0
  );
  return (
    <div className="w-full sm:w-[80%] m-2">
      <h2 className="my-4 text-xl font-bold text-gray-900">Bookmark List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bookmarkedPlaces.map((item) => (
          <Link
            key={item.id}
            to={`/bookmark/?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              onClick={() => setCurrent(item.id)}
              className={`p-4 rounded-2xl shadow-xl  bg-gray-300/50 backdrop-blur-lg flex
              flex-col space-y-4 ${
                current === item.id
                  ? "border-2 border-indigo-500 shadow-2xl"
                  : ""
              }`}
            >
              <BookmarkActions
                handleEditPerson={handleEditPerson}
                handleEditDate={handleEditDate}
                handleDelete={handleDelete}
                item={item}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 rounded-lg">
        <button
          onClick={() => navigate("/hotels")}
          className="btn-primary sm:py-2 sm:px-8 p-2 text-sm sm:text-lg"
        >
          Available hotels
        </button>
        <div className="my-4 flex items-center text-sm sm:text-lg font-bold text-teal-600">
          TOTAL: {totalPrice} <FaEuroSign className="inline" />
        </div>
      </div>
    </div>
  );
}

export default BookMarkList;
