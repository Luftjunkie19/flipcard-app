import { createContext, useEffect, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "READY_AUTH":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authRed, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    async function fetchUser() {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser !== null) {
        dispatch({ type: "READY_AUTH", payload: JSON.parse(storedUser) });
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authRed, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
