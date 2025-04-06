import React, { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "myBookmarks";

const initialState = {
  isLoading: false,
  bookmarks: [],
  currentBookMark: null,
};

function saveToLocalStorage(bookmarks) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function generateId() {
  return Date.now(); 
}

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "bookmark/init":
      return { ...state, isLoading: false, bookmarks: action.payload };

    case "currentBookMark/loaded":
      return { ...state, isLoading: false, currentBookMark: action.payload };

    case "bookmark/loaded":
      const newBookmarks = [...state.bookmarks, action.payload];
      saveToLocalStorage(newBookmarks);
      return { ...state, isLoading: false, bookmarks: newBookmarks };

    case "currentBookMark/edit":
      const edited = state.bookmarks.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      saveToLocalStorage(edited);
      return {
        ...state,
        isLoading: false,
        currentBookMark: action.payload,
        bookmarks: edited,
      };

    case "currentBookMark/delete":
      const filtered = state.bookmarks.filter((item) => item.id !== action.payload);
      saveToLocalStorage(filtered);
      return { ...state, isLoading: false, bookmarks: filtered };

    default:
      throw new Error("Unknown action type");
  }
}

const BookMarkContext = createContext();

function BookMarkProviderList({ children }) {
  const [{ isLoading, bookmarks, currentBookMark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    const localBookmarks = loadFromLocalStorage();
    dispatch({ type: "bookmark/init", payload: localBookmarks });
  }, []);

  function getBookmark(id) {
    dispatch({ type: "loading" });
    const bookmark = bookmarks.find((item) => item.id === id);
    if (bookmark) {
      dispatch({ type: "currentBookMark/loaded", payload: bookmark });
    } else {
      toast.error("Bookmark not found");
    }
  }

  function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    const created = { ...newBookmark, id: generateId() };
    dispatch({ type: "bookmark/loaded", payload: created });
    dispatch({ type: "currentBookMark/loaded", payload: created });
  }

  function deleteBookmark(id) {
    dispatch({ type: "currentBookMark/delete", payload: id });
  }

  function editBookmark(id, updatedData) {
    const updated = { ...updatedData, id };
    dispatch({ type: "currentBookMark/edit", payload: updated });
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
        editBookmark,
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
