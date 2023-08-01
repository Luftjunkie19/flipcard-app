import { createContext, useReducer } from "react";

export const LanguageContext = createContext();

export const languageReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SET":
      return {
        sets: [...state.sets, action.payload],
        setsNumber: state.setsNumber + 1,
      };
    case "REMOVE_SET":
      return { sets: action.payload, setsNumber: state.setsNumber - 1 };

    case "UPDATE_SET":
      return { ...state, sets: action.payload };

    default:
      return state;
  }
};

export function LanguageContextProvider({ children }) {
  const [lngReducer, dispatch] = useReducer(languageReducer, {
    sets: [],
    setsNumber: 0,
  });

  return (
    <LanguageContext.Provider value={{ ...lngReducer, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
}
