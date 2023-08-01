import { useContext } from "react";

import { LanguageContext } from "../Context/LanguageSetContext";

export function LangSetsContext() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("Context should be included in a provider");
  }

  return context;
}
