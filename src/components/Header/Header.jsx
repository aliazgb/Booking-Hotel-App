import React, { useRef, useState } from "react";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { useOutSideClick } from "../../hook/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format, compareAsc } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";

function Header() {
  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  // const [openDate ,setOpenDate]=useState(false)
  const navigate = useNavigate();
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
  const dateRef = useRef();
  useOutSideClick(dateRef, () => setOpenDate(false), "dateOpener");
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

        <div className="headerSearchItem dateOpener" ref={dateRef} onClick={() => setOpenDate(!openDate)}>
          <HiCalendar className="dateIcon" />
          <div className="dateDropDown">
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
