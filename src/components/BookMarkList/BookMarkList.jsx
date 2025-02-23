import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosOptions } from "react-icons/io";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useDate } from "../../Context/ReservProvider";

function BookMarkList() {
  const { currentBookMark } = useBookMark();
  const [selectId, setSelectID] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const {
    finalPrice,
    setOpenOption,
    openOption,
    setOption,
    setPrice,
    bookmarkedPlaces ,
    setBookmarkedPlaces,
    option,
    date,
    setDate,
    openDate,
    setOpenDate,
  } = useDate();

  useEffect(() => {
    if (!openOption && selectId !== null) {
      handleDoneifo(selectId);
      setSelectID(null);
    }
  }, [openOption]);

  const handleDoneifo = (id) => {
    const updateBookmarkedPlaces  = bookmarkedPlaces .map((f) =>
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
  };

  const handleDoneDate = (id) => {
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const dada=date
    const updateBookmarkedPlaces  = bookmarkedPlaces .map((f) =>
      f.id === id
        ? {
            ...f,
            date:dada,
          }
        : f
    );
    setBookmarkedPlaces(updateBookmarkedPlaces);
    console.log(updateBookmarkedPlaces);
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
  return (
    <div className="w-full sm:w-[80%] m-2">
      <h2 className="my-4 text-lg sm:text-xl">Bookmark List{finalPrice}</h2>
      <div>
        <div className="mt-4">
          {bookmarkedPlaces.map((item) => {
            const isCurrentBookmark = item.id === currentBookMark?.id;
            const differenceInDays = Math.floor(
              (item.date[0].endDate - item.date[0].startDate) /
                (1000 * 60 * 60 * 24)
            );
            const basePrice = (Number(item.price) || 0) * differenceInDays;
            const extraAdultPrice =
              item.option.adult > 1
                ? (item.option.adult - 1) * 0.2 * basePrice
                : 0;
            const extraChildrenPrice =
              item.option.children > 0
                ? item.option.children * 0.1 * basePrice
                : 0;

            return (
              <div
                key={item.id}
                className={`text-sm sm:text-lg mb-4 border border-gray-400 rounded-xl p-1 sm:p-4
                    flex items-center justify-between
                    ${
                      isCurrentBookmark
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
                  {basePrice + extraAdultPrice + extraChildrenPrice}
                  <button
                    className="mr-8"
                    onClick={(e) => handleEditPerson(e, item.id)}
                  >
                    <IoIosOptions />
                  </button>
                  <button onClick={() => handleEditDate(item.id)}>
                    <CiCalendarDate />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="btn-primary sm:py-2 sm:px-8 p-1 text-sm sm:text-lg">
        Recommended ...
      </button>
    </div>
  );
}

export default BookMarkList;
