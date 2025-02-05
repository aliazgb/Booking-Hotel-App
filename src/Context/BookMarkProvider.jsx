import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import { useSearchParams } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const initialState = {
  isLoading: false,
  bookmarks: [],
  currentBookMark: null,
};
const BASE_URL = "http://localhost:5000";

function bookmarkReducer(state, actions) {
  switch (actions.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "currentBookMark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookMark: actions.payload,
      };
    case "bookmark/loaded":return{
      isLoading: false,
    }
    default: throw new Error("unknown Action")
  }
}

const BookMarkContext = createContext();
function BookMarkProviderList({ children }) {
  // const [currentBookMark, setCurrentBookMark] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [bookmarks, setBookmarks] = useState([]);
  const [{ isLoading, bookmarks, currentBookMark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchBookmark(id) {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/`);
        dispatch({ type: "currentBookMark/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchBookmark();
  }, []);
  async function getBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "currentBookMark/loaded", payload: data });
      dispatch({ type: "loading" });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "loading" });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "currentBookMark/loaded", payload: data });
      dispatch({type:"bookmark/loaded",payload:data})
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(true);
      setCurrentBookMark([]);
    }
  }
  async function deleteBookmark(id) {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setIsLoading(true);
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
        deleteBookmark,
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
