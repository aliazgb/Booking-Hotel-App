import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  registeredUser: JSON.parse(localStorage.getItem("registeredUser")) || null,
  createIsDone: false
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(state.registeredUser));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      return {
        ...state,
        user: state.registeredUser, 
        isAuthenticated: true,
      };
    case "logout":
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "createAccount":
      localStorage.setItem("registeredUser", JSON.stringify(action.payload));
      return {
        ...state,
        registeredUser: action.payload, 
        createIsDone: true
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function createAccount(name, email, password) {
    const newUser = { name, email, password };
    dispatch({ type: "createAccount", payload: newUser });
  }

  function login(email, password) {
    if (
      state.registeredUser &&
      state.registeredUser.email === email &&
      state.registeredUser.password === password
    ) {
      toast.success('Welcome!')
      dispatch({ type: "login" });
    } else {
      toast.error("username or password is incorrect");
    }
  }

  function logout() {
    toast.success("you are signed out")
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        createAccount,
        isAuthenticated: state.isAuthenticated,
        name: state.user ? state.user.name : ""
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
