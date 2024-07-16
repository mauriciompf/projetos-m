import { useContext } from "react";
import { ToggleContext } from "../context/ToggleContextProvider";

const useToggleContext = () => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error("...");
  }

  return { context };
};

export { useToggleContext };
