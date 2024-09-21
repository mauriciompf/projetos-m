import Button from "./Button";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { useMenuContext } from "../context/MenuContext";
import { useThemeContext } from "../context/ThemeContext";
import { darkIcon, lightIcon } from "../utils/icons";
import { ThemeButtonProps } from "../utils/types";

export default function ThemeButton({ className }: ThemeButtonProps) {
  const { isMenuOpen } = useMenuContext();
  const { theme, setLight, setDark } = useThemeContext();
  const location = useLocation();

  const isHomePage =
    location.pathname === "/" || location.pathname === "/pages/filter";

  const handleThemeNameChange = () =>
    theme === "dark" ? setLight() : setDark();

  useEffect(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove(
      `bg-[#181a1b]`,
      "bg-columbia",
      "text-columbia",
      `text-jet`,
    );

    if (theme === "dark") {
      bodyClassList.add(`bg-[#181a1b]`, "text-columbia");
    } else {
      bodyClassList.add("bg-columbia", `text-jet`);
    }
  }, [theme]);

  return (
    <>
      <span className="sr-only">Mude o tema</span>
      <Button
        onClick={handleThemeNameChange}
        className={twMerge(
          ` ${isHomePage && isMenuOpen && "px-3 py-2"} flex select-none gap-2 rounded-2xl shadow-sm ring-transparent hover:text-savoy focus:text-savoy`,
          className,
        )}
        aria-label={`Change to ${theme === "dark" ? "dark" : "light"} theme`}
      >
        <span draggable={false} className="select-none">
          {theme === "dark" ? lightIcon : darkIcon}
        </span>
      </Button>
    </>
  );
}
