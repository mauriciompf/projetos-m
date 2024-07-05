import Button from "./Button";
import useThemeContext from "../customHooks/useThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const darkIcon = <FontAwesomeIcon icon={faMoon} />;
const lightIcon = <FontAwesomeIcon icon={faSun} />;

type ThemeButtonProps = {
  themeIcon: "dark" | "light";
};

export default function ThemeButton({ themeIcon }: ThemeButtonProps) {
  const { theme, lightTheme, darkTheme } = useThemeContext();

  useEffect(() => {
    document.body.classList.remove("bg-white", "bg-black");
    document.body.classList.add(theme === "dark" ? "bg-black" : "bg-white");
    document.body.classList.add(
      "transition-colors",
      "duration-200",
      "ease-in-out",
    );
  }, [theme]);

  return (
    <>
      <span className="sr-only">Mude o tema</span>
      <Button
        onClick={themeIcon === "dark" ? darkTheme : lightTheme}
        className={`flex gap-2 ${theme === "dark" && "bg-black text-white"}`}
      >
        <span>{themeIcon === "dark" ? darkIcon : lightIcon}</span>
        <span>{themeIcon === "dark" ? "Escuro" : "Claro"}</span>
      </Button>
    </>
  );
}
