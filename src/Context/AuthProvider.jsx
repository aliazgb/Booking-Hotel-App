import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  registeredUser: null,
  createIsDone:false
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: state.registeredUser, 
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "createAccount":
      return {
        ...state,
        registeredUser: action.payload, 
        createIsDone:true
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
      dispatch({ type: "login" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, createAccount,isAuthenticated: state.isAuthenticated ,name: state.registeredUser ? state.registeredUser.name : ''}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
