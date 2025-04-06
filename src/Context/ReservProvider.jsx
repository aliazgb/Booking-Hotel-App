import React, { createContext, useContext, useEffect, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [openOption, setOpenOption] = useState(false);

  const [bookmarkedPlaces, setBookmarkedPlaces] = useState(() => {
    const stored = localStorage.getItem("bookmarkedPlaces");
    return stored ? JSON.parse(stored) : [];
  });

  const [openDate, setOpenDate] = useState();
  const [price, setPrice] = useState(0);

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
    localStorage.setItem("bookmarkedPlaces", JSON.stringify(bookmarkedPlaces));
  }, [bookmarkedPlaces]);

  function getTotalBookingPrice(date, id) {
    const selectedHotel = date.find((f) => f.id == id);
    if (selectedHotel) {
      const differenceInDays = Math.floor(
        (selectedHotel.date[0].endDate - selectedHotel.date[0].startDate) /
          (1000 * 60 * 60 * 24) || 1
      );
      const basePrice = (Number(selectedHotel.price) || 0) * differenceInDays;
      const extraAdultPrice =
        selectedHotel.option.adult > 1
          ? (selectedHotel.option.adult - 1) * 0.2 * basePrice
          : 0;
      const extraChildrenPrice =
        selectedHotel.option.children > 0
          ? selectedHotel.option.children * 0.1 * basePrice
          : 0;
      const finalPrice = basePrice + extraAdultPrice + extraChildrenPrice;
      selectedHotel.finalPrice = finalPrice;
      selectedHotel.differenceInDays = differenceInDays;
    }
  }

  return (
    <DateContext.Provider
      value={{
        openDate,
        setOpenDate,
        date,
        setDate,
        option,
        setOption,
        price,
        setPrice,
        openOption,
        setOpenOption,
        setBookmarkedPlaces,
        bookmarkedPlaces,
        getTotalBookingPrice,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useReserve = () => useContext(DateContext);
