import React, { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [openOption, setOpenOption] = useState(false);
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState(() => []);
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

  function final(date, id) {
    const of = date.find((f) => f.id == id);
    if (of) {
      const differenceInDays = Math.floor(
        (of.date[0].endDate - of.date[0].startDate) / (1000 * 60 * 60 * 24) || 1
      );
      const basePrice = (Number(of.price) || 0) * differenceInDays;
      const extraAdultPrice =
        of.option.adult > 1 ? (of.option.adult - 1) * 0.2 * basePrice : 0;
      const extraChildrenPrice =
        of.option.children > 0 ? of.option.children * 0.1 * basePrice : 0;
      const finalPrice = basePrice + extraAdultPrice + extraChildrenPrice;
      of.finalPrice =finalPrice;
     
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
        final,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useReserve = () => useContext(DateContext);
