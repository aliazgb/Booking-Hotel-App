import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FiLogIn } from "react-icons/fi";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useDate } from "../../Context/ReservProvider";
import { useOutSideClick } from "../../hook/useOutsideClick";

function Header() {
  const { isAuthenticated } = useAuth();
  const {
    openDate,
    setOpenDate,
    date,
    setDate,
    option,
    setOption,
    openOption,
    setOpenOption,
  } = useDate();
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (date[0].endDate !== date[0].startDate) {
      const timer = setTimeout(() => {
        setOpenDate(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [date[0].endDate]);

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation == "dec" ? prev[name] - 1 : prev[name] + 1,
      };
    });
  };
  const handleSearchParams = () => {
    const encoded = createSearchParams({
      option: JSON.stringify(option),
      date: JSON.stringify(date),
      destination,
    });
    navigate({
      pathname: "/hotels",
      search: encoded.toString(),
    });
  };
  return (
    <div className="flex items-center justify-center gap-x-1 m-4 relative">
      {isAuthenticated ? (
        <button
          className="absolute left-[1%] sm:left-[10%] btn-primary p-3 text-sm sm:text-[15px] mx-3  "
          onClick={() => navigate("/")}
        >
          <IoMdHome />
        </button>
      ) : (
        ""
      )}
      <div
        className="p-4 flex flex-col md:flex-row w-full max-w-[900px] text-sm justify-between items-center gap-4 
        border border-gray-400  rounded-3xl"
      >
        <div className="flex items-center relative">
          <div className="flex items-center ">
            <MdLocationOn className="text-rose-500" />
            <input
              type="text"
              placeholder="Where to go ?"
              className="mx-1 max-w-[100px] outline-0"
              value={destination}
              onChange={(e) => setDestination(e.target.value || "")}
            />
            <span className="flex items-center relative sm:w-0.5 sm:h-7 sm:mx-4 bg-white sm:bg-gray-500"></span>
          </div>
          <div className="dateOpener">
            <div className="flex items-center relative">
              <HiCalendar className="text-indigo-600" />
              <div
                className="ml-0.5 text-sm"
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </div>
              {openDate && (
                <DateRange
                  ranges={date}
                  onChange={(item) => setDate([item.selection])}
                  className="absolute top-[50px] left-[-5rem] z-[1002]"
                  minDate={new Date()}
                />
              )}
              <span className="flex items-center relative w-0.5 h-7 bg-white sm:bg-gray-500 mx-2 sm:mx-6"></span>
            </div>
          </div>
        </div>
        <div className="flex items-center relative z-[1001]">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option.adult}adult &bull; {option.children}children &bull;{" "}
            {option.room}room
          </div>
          {openOption && (
            <GuestOptionList
              option={option}
              handleOption={handleOption}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="flex items-center relative w-0.5 h-7 bg-white sm:bg-gray-500 mx-4 sm:ml-7"></span>
        </div>
        <div className="flex flex-row items-center justify-between sm:mr-4">
          <div className="flex items-center relative">
            <button
              className="btn-primary flex items-center justify-center  mx-2 p-2"
              onClick={handleSearchParams}
            >
              <HiSearch className="inline-block w-6 h-6" />
            </button>
          </div>
          <button
            className="btn-primary p-2 text-sm sm:text-[15px] mx-3"
            onClick={() => navigate("/bookmark")}
          >
            bookmarks
          </button>
          <User />
        </div>
      </div>
    </div>
  );
}

function User() {
  const { isAuthenticated, name, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button
            className="btn-primary w-10 h-10 p-1 rounded-full flex justify-center items-center "
            onClick={handleLogout}
          >
            <TbLogout2 className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="btn-primary w-10 h-10 p-1 rounded-full flex justify-center items-center"
        >
          <FiLogIn className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function GuestOptionList({ option, handleOption, setOpenOption }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, () => setOpenOption(false), "optionDropDown");
  return (
    <div
      className="absolute bg-white w-50 shadow-md shadow-[#efefef] rounded-lg z-50 top-12 p-3"
      ref={optionRef}
    >
      <OptionItem
        option={option}
        type="adult"
        minLimit={1}
        handleOption={handleOption}
      />
      <OptionItem
        option={option}
        type="children"
        minLimit={0}
        handleOption={handleOption}
      />
      <OptionItem
        option={option}
        type="room"
        minLimit={1}
        handleOption={handleOption}
      />
    </div>
  );
}

function OptionItem({ option, type, minLimit, handleOption }) {
  const isDisabled = option[type] <= minLimit;
  return (
    <div className="flex items-center justify-between gap-4 my-4 ">
      <span className="inline-block flex-1 text-[0.9rem]">{type}</span>
      <div className="flex items-center gap-4 ">
        <button
          className={`bg-gray-100 p-1.5 rounded-lg ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => handleOption(type, "dec")}
          disabled={isDisabled}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          className="bg-gray-100 p-1.5 rounded-lg cursor-pointer"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
export default Header;
