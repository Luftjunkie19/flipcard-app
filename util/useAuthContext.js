import { useContext } from "react";

import { AuthContext } from "../Context/AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context must be passed into Provider");
  }

  return context;
}
