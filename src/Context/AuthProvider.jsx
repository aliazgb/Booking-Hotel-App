import React, { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      const user = { name: "Test User", email: "test.app@gmail.com" };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      return {
        ...state,
        user,
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

    default:
      throw new Error("Unknown Action");
  }
}

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(email, password) {
    if (email === "test.app@gmail.com" && password === "1234") {
      toast.success("Welcome Test User");
      dispatch({ type: "login" });
    } else {
      toast.error("Email or password is incorrect");
    }
  }

  function logout() {
    toast.success("You are signed out");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isAuthenticated: state.isAuthenticated,
        name: state.user ? state.user.name : "",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
