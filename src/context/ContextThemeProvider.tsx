import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

export interface TypeTheme {
  theme: string;
  setLight: () => void;
  setDark: () => void;
}

const ContextTheme = createContext<TypeTheme | null>(null);

type ContextThemeProviderProps = {
  children: React.ReactNode;
};

function ContextThemeProvider({ children }: ContextThemeProviderProps) {
  const prefersDarkMode = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage({
    key: "theme",
    initialState: prefersDarkMode() ? "dark" : "light",
  });

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");

  return (
    <ContextTheme.Provider value={{ theme, setLight, setDark }}>
      {children}
    </ContextTheme.Provider>
  );
}

export { ContextThemeProvider, ContextTheme };
