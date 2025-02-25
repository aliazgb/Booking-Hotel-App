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
const BASE_URL = "https://server-1-ej86.onrender.com";

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
      case "currentBookMark/edit":
        return {
          ...state,
          isLoading: false,
          currentBookMark: actions.payload,
          bookmarks: [...state.bookmarks, actions.payload],
        };
    case "bookmark/loaded":
      return {
        isLoading: false,
        ...state,
        bookmarks: [...state.bookmarks, actions.payload],
      };
    case "currentBookMark/delete":
      return {
        isLoading: false,
        ...state,
        bookmarks:state.bookmarks.filter((item)=>item.id!==actions.payload)
      };
    default:
      throw new Error("unknown Action");
  }
}

const BookMarkContext = createContext();
function BookMarkProviderList({ children }) {
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
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "currentBookMark/loaded", payload: data });
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {}
  }
  async function deleteBookmark(id) {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "currentBookMark/delete",payload:id });
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function editBookmark(id,data) {
    try {
      console.log(data)
      await axios.put(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "currentBookMark/edit",payload:data });
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
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
        editBookmark
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
