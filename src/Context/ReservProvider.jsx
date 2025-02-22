import React, { createContext, useContext, useEffect, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [openOption, setOpenOption] = useState(false);
  const [kos, setKos] = useState(() => []);
  const [openDate, setOpenDate] = useState(false);
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

  useEffect(() => {
    const differenceInDays = Math.max(
      Math.floor((date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24))
    );
    const basePrice = (Number(price) || 0) * differenceInDays;

    const extraAdultPrice =
      option.adult > 1 ? (option.adult - 1) * 0.2 * basePrice : 0;

    const extraChildrenPrice =
      option.children > 0 ? option.children * 0.1 * basePrice : 0;

    setFinalPrice(
      (basePrice + extraAdultPrice + extraChildrenPrice).toFixed(2)
    );
  }, [price, option, date]);

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
        setKos,
        kos,
        setFinalPrice
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
