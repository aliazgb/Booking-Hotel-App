import React, { createContext, useContext, useEffect, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [openOption, setOpenOption] = useState(false);
  const [bookmarkedPlaces , setBookmarkedPlaces] = useState(() => []);
  const [openDate, setOpenDate] = useState();
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

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

  return (
    <DateContext.Provider
      value={{
        openDate,
        setOpenDate,
        date,
        setDate,
        option,
        setOption,
        finalPrice,
        price,
        setPrice,
        openOption,
        setOpenOption,
        setBookmarkedPlaces,
        bookmarkedPlaces ,
        setFinalPrice,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
