import React, { createContext, useContext, useState } from "react";
import useFetch from "../hook/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";
const BookMarkContext = createContext();
function BookMarkProviderList({ children }) {
  const [currentBookMark, setCurrentBookMark] = useState();
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    try {
      setIsLoadingCurrentBookmark(true);
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookMark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentBookmark(true);
      setCurrentBookMark([]);
    }
  }
  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookMark,
        getBookmark,
        isLoadingCurrentBookmark,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}

export default BookMarkProviderList;
export function useBookMark() {
  return useContext(BookMarkContext);
}
