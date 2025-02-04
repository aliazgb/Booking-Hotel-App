import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";
const BookMarkContext = createContext();
function BookMarkProviderList({ children }) {
  const [currentBookMark, setCurrentBookMark] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    async function fetchBookmark(id) {
      setIsLoading(true);
      setCurrentBookMark(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/`);
        setCurrentBookMark(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(true);
        setCurrentBookMark([]);
      }
    }
    fetchBookmark()
  }, []);
  async function getBookmark(id) {
    setIsLoading(true);
    setCurrentBookMark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookMark(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(true);
      setCurrentBookMark([]);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    setCurrentBookMark(null);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookMark(data);
      setIsLoading(false);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(true);
      setCurrentBookMark([]);
    }
  }
  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        createBookmark,
        currentBookMark,
        getBookmark,
        bookmarks,
        // isLoadingCurrentBookmark,
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
