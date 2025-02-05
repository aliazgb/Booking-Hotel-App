import React, { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "ali",
  email: "azarkashb",
  password: "1234",
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown Action");
  }
}
export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function login(email, password) {
    if (FAKE_USER.email == email && FAKE_USER.password == password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
