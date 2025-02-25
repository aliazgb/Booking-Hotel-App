import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link, useNavigate } from "react-router-dom";
import { useReserve } from "../../Context/ReservProvider";
import BookmarkActions from "../BookmarkActions/bookMarkActions";

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
      <h2 className="my-4 text-lg sm:text-xl">Bookmark List</h2>
      <div>
        <div className="mt-4">
          {bookmarkedPlaces.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/bookmark/?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <div
                  onClick={() => setCurrent(item.id)}
                  className={`text-sm sm:text-lg mb-4 border border-gray-400 rounded-xl p-1 sm:p-4
                    flex items-center justify-between
                    ${
                      current == item.id
                        ? "border-2 border-indigo-600 bg-text-100"
                        : ""
                    }
                    sm:flex-row sm:space-x-4`}
                >
                  <div className="mx-1">
                    <ReactCountryFlag svg countryCode={item.countryCode} />
                    &nbsp; <strong>{item.cityName}</strong> &nbsp;
                    <span className="text-xs sm:text-lg">{item.country}</span>
                  </div>
                  <div>
                    <span>For {item.differenceInDays} night</span>

                    <span>
                      {
                        bookmarkedPlaces.find((f) => f.id == item.id)
                          ?.finalPrice
                      }{" "}
                      &euro;
                    </span>
                  </div>
                  <BookmarkActions
                    handleEditPerson={handleEditPerson}
                    handleEditDate={handleEditDate}
                    handleDelete={handleDelete}
                    item={item}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="btn-primary sm:py-2 sm:px-8 p-1 text-sm sm:text-lg"
          onClick={() => navigate("/hotels")}
        >
          available hotels ...
        </button>
        <div>
          <span>TOTAL : {totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default BookMarkList;
