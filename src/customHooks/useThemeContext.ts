import { useContext } from "react";
import { ContextTheme } from "../context/ContextThemeProvider";

const useThemeContext = () => {
  const context = useContext(ContextTheme);

  if (!context) {
    throw new Error(
      "Failed to context provider... Verify the provider component.",
    );
  }

  return context;
};

export default useThemeContext;
