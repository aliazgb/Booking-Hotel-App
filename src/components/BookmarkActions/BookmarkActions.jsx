import React from "react";
import ReactCountryFlag from "react-country-flag";
import { FaEuroSign } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
function BookmarkActions({
  handleEditPerson,
  handleEditDate,
  handleDelete,
  item,
}) {
  return (
    <>
      <div className="flex items-center">
        <span className="text-2xl">{item.flag}</span>
        <strong className="text-lg text-gray-800">{item.cityName}</strong>
        <ReactCountryFlag className="mx-2" svg countryCode={item.countryCode} />
      </div>
      <div
        onClick={() => handleEditDate(item.id, item.date)}
        className="flex justify-between items-center text-gray-600 text-sm sm:text-lg"
      >
        <span>For {item.differenceInDays} nights</span>
        <button>
          <IoCalendarClearOutline
            className="cursor-pointer hover:text-indigo-700 transition-all duration-300 ease-in-out"
            size={22}
          />
        </button>
      </div>
      <div
        onClick={(e) => handleEditPerson(e, item.id)}
        className="flex items-center justify-between text-gray-600 text-sm sm:text-lg"
      >
        <span>
          {item.option.adult} adult - {item.option.children} children
        </span>
        <button className="text-gray-600 hover:text-indigo-700 transition-all duration-300 ease-in-out">
          <MdFamilyRestroom className="cursor-pointer" size={22} />
        </button>
      </div>
      <div
        onClick={() => handleDelete(item.id)}
        className="flex items-center justify-between space-x-4"
      >
        <p className="text-indigo-600 text-lg font-bold flex items-center">
          <span>{item.finalPrice}</span>
          <FaEuroSign />
        </p>
        <button className="text-red-500 hover:text-red-600 transition-all duration-300 ease-in-out">
          <RiDeleteBin6Line className="cursor-pointer" size={22} />
        </button>
      </div>
    </>
  );
}

export default BookmarkActions;
