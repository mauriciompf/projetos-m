import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { useMenuContext } from "../context/MenuContext";
import { useThemeContext } from "../context/ThemeContext";

const lightIcon = <FontAwesomeIcon icon={faSun} />;
const darkIcon = <FontAwesomeIcon width="16px" icon={faMoon} />;

type ThemeButtonProps = {
  themeName: "dark" | "light";
  className?: string;
  isOpenMenu?: boolean;
};

export default function ThemeButton({
  themeName,
  className,
}: ThemeButtonProps) {
  const { isOpenMenu } = useMenuContext();
  const { theme, setLight, setDark } = useThemeContext();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleThemeNameChange = () =>
    themeName === "dark" ? setDark() : setLight();

  useEffect(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove(
      `bg-[#181a1b]`,
      "bg-white",
      "text-white",
      `text-black`,
    );
    bodyClassList.add("transition-colors", "duration-300", "ease-in-out");

    if (theme === "dark") {
      bodyClassList.add(`bg-[#181a1b]`, "text-white");
    } else {
      bodyClassList.add("bg-white", `text-black`);
    }
  }, [theme]);

  return (
    <>
      <span className="sr-only">Mude o tema</span>
      <Button
        onClick={handleThemeNameChange}
        className={twMerge(
          ` ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} flex select-none gap-2 shadow-sm`,
          className,
        )}
        aria-label={`Change to ${themeName === "dark" ? "dark" : "light"} theme`}
      >
        <span draggable={false}>
          {themeName === "dark" ? darkIcon : lightIcon}
        </span>
        <span
          className={`transition-all duration-300 ease-in-out ${!isHomePage && !isOpenMenu && "w-0 opacity-0"}`}
        >
          {themeName === "dark" ? "Escuro" : "Claro"}
        </span>
      </Button>
    </>
  );
}
