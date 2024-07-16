import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";
import useCustomHookContext from "../customHooks/useCustomHookContext";

export interface ThemeValues {
  theme: string;
  setLight: () => void;
  setDark: () => void;
}

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeValues | null>(null);

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useLocalStorage({
    key: "theme",
    initialState: "dark",
  });

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");

  return (
    <ThemeContext.Provider value={{ theme, setLight, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useThemeContext = () =>
  useCustomHookContext(ThemeContext, "useThemeContext", "ThemeContextProvider");

export { ThemeContextProvider, useThemeContext };
