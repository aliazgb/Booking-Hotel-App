import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
const BASE_URL = "https://server-xb4n.onrender.com/hotels/";
const HotelsContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingHotel, setIsLoadingHotel] = useState(false);
  const desti = searchParams.get("destination");
  const [dataHotel, setDataHotel] = useState({});
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "https://server-xb4n.onrender.com/hotels",
    `q=${desti || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    try {
      setIsLoadingHotel(true);
      const { data } = await axios.get(`${BASE_URL}${id}`);
      setDataHotel(data);
      setIsLoadingHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingHotel(true);
      setDataHotel([]);
    } 
  }
  return (
    <HotelsContext.Provider
      value={{ isLoading, hotels, dataHotel, getHotel, isLoadingHotel }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;
export function UseHotels() {
  return useContext(HotelsContext);
}
