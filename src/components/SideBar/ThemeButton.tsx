import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import Button from "../Button";
import { darkIcon, lightIcon } from "../../utils/icons";

export default function ThemeButton({ className }: { className: string }) {
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
      "bg-alt_black",
      "bg-alt_white",
      "text-alt_white",
      "text-jet",
    );

    if (theme === "dark") {
      bodyClassList.add("bg-alt_black", "text-alt_white");
    } else {
      bodyClassList.add("bg-alt_white", `text-jet`);
    }
  }, [theme]);

  return (
    <>
      <Button
        onClick={handleThemeNameChange}
        className={twMerge(
          ` ${isHomePage && isMenuOpen && "px-3 py-2"} flex select-none gap-2 rounded-2xl shadow-sm ring-transparent hover:text-savoy focus:text-savoy`,
          className,
        )}
        aria-label={`Altere o tema`}
      >
        <span draggable={false} className="select-none">
          {theme === "dark" ? lightIcon : darkIcon}
        </span>
      </Button>
    </>
  );
}
