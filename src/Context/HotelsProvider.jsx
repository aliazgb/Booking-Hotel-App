import React, { createContext, useContext } from "react";
import useFetch from "../hook/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelsContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const desti = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${desti || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;
export function UseHotels() {
  return useContext(HotelsContext);
}
