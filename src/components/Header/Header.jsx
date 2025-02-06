import React, { useEffect, useRef, useState } from "react";
import {
  HiCalendar,
  HiSearch,
  HiMinus,
  HiPlus,
  HiLogout,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { useOutSideClick } from "../../hook/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format, compareAsc } from "date-fns";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

function Header() {
  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, createIsDone } = useAuth();
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
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
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="locationIcon" />

          <input
            type="text"
            placeholder="Where to go ?"
            className="headerSearchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value || "")}
          />
          <span className="headerSearchItem seperator"></span>
        </div>
        <div className="dateOpener">
          <div className="headerSearchItem">
            <HiCalendar className="dateIcon" />
            <div
              className="dateDropDown"
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
                className="date"
                minDate={new Date()}
              />
            )}
            <span className="headerSearchItem seperator"></span>
          </div>
        </div>
        <div className="headerSearchItem">
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
          <span className="headerSearchItem seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearchParams}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}
function User() {
  const { login, isAuthenticated, name ,logout} = useAuth();
  const handleLogout=()=>{
    logout()
    navigate("/")
  }
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>{name}</span>&nbsp;
          <button>
            <HiLogout className="icon" onClick={handleLogout} />
          </button>
        </div>
      ) : (
        <NavLink to={"/login"}>login</NavLink>
      )}
    </div>
  );
}
function GuestOptionList({ option, handleOption, setOpenOption }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, () => setOpenOption(false), "optionDropDown");
  return (
    <div className="guestOptions" ref={optionRef}>
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
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "dec")}
          disabled={option[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
export default Header;
