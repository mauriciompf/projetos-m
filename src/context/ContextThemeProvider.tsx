import { createContext, useState } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

export interface TypeTheme {
  theme: string;
  lightTheme: () => void;
  darkTheme: () => void;
}

const ContextTheme = createContext<TypeTheme | null>(null);

type ContextThemeProviderProps = {
  children: React.ReactNode;
};

function ContextThemeProvider({ children }: ContextThemeProviderProps) {
  const isDarkSchema =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage({
    key: "theme",
    initialState: isDarkSchema ? "dark" : "light",
  });

  const lightTheme = () => {
    setTheme("light");
    console.log(theme);
  };
  const darkTheme = () => setTheme("dark");

  return (
    <ContextTheme.Provider value={{ theme, lightTheme, darkTheme }}>
      {children}
    </ContextTheme.Provider>
  );
}

export { ContextThemeProvider, ContextTheme };
