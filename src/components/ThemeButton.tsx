import Button from "./Button";
import useThemeContext from "../customHooks/useThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import toggleThemeClasses from "../utils/toggleThemeClasses";
import { useEffect } from "react";

const darkIcon = <FontAwesomeIcon icon={faMoon} />;
const lightIcon = <FontAwesomeIcon icon={faSun} />;

type ThemeButtonProps = {
  themeName: "dark" | "light";
};

export default function ThemeButton({ themeName }: ThemeButtonProps) {
  const { theme, setLight, setDark } = useThemeContext();

  const handleThemeNameChange = () =>
    themeName === "dark" ? setDark() : setLight();

  useEffect(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove(
      `bg-[#282b30]`,
      "bg-white",
      "text-white",
      `text-black`,
    );
    bodyClassList.add("transition-colors", "duration-300", "ease-in-out");

    if (theme === "dark") {
      bodyClassList.add(`bg-[#282b30]`, "text-white");
    } else {
      bodyClassList.add("bg-white", `text-black`);
    }
  }, [theme]);

  return (
    <>
      <span className="sr-only">Mude o tema</span>
      <Button
        onClick={handleThemeNameChange}
        className={toggleThemeClasses(
          theme === "dark" ? "bg-white text-black" : "bg-black text-white",
          "flex gap-2 shadow-sm",
        )}
        aria-label={`Change to ${themeName === "dark" ? "dark" : "light"} theme`}
      >
        <span>{themeName === "dark" ? darkIcon : lightIcon}</span>
        <span>{themeName === "dark" ? "Escuro" : "Claro"}</span>
      </Button>
    </>
  );
}
