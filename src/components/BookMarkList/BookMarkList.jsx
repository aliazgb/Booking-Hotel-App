import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { IoIosOptions } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useDate } from "../../Context/ReservProvider";
import { MdDoneOutline } from "react-icons/md";

function BookMarkList() {
  const { currentBookMark } = useBookMark();
  const [selectId, setSelectID] = useState(null); 
  const {
    finalPrice,
    setFinalPrice,
    setOpenOption,
    openOption,
    setOpenDate,
    setOption,
    setDate,
    option,
    price,
    setPrice,
    kos,
    setKos,
  } = useDate();

  useEffect(() => {
    if (!openOption && selectId !== null) {
      handleDoneifo(selectId);
      setSelectID(null); 
    }
  }, [openOption]);

  const handleDoneifo = (id) => {
    const updatedKos = kos.map((f) =>
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

    setKos(updatedKos);
  };

  const handleEditPerson = (e, id) => {
    e.preventDefault();

    const selected = kos.find((s) => s.id === id);
    if (selected) {
      setOption(selected.option);
      setPrice(selected.price);
      setSelectID(id); 
      setOpenOption(true);
    }
  };

  return (
    <div className="w-full sm:w-[80%] m-2">
      <h2 className="my-4 text-lg sm:text-xl">Bookmark List {finalPrice}</h2>
      <div>
        <div className="mt-4">
          {kos.map((item) => {
            const isCurrentBookmark = item.id === currentBookMark?.id;
            return (
              <div
                key={item.id}
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
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span className="text-xs sm:text-lg">{item.country}</span>
                </div>

                <div>
                  <span className="mr-4">قیمت: {item.finalPrice || "بدون قیمت"}</span>
                  <button className="mr-8" onClick={(e) => handleEditPerson(e, item.id)}>
                    <IoIosOptions />
                  </button>
                  <button onClick={() => handleDoneifo(item.id)}>
                    <MdDoneOutline />
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
