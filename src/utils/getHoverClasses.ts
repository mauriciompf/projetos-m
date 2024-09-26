import { useThemeContext } from "../context/ThemeContext";

const getHoverClasses = () => {
  const { theme } = useThemeContext();
  return theme === "dark"
    ? "hover:bg-alt_white hover:text-jet focus:bg-alt_white focus:text-jet"
    : "hover:bg-jet hover:text-alt_white focus:bg-jet focus:text-alt_white";
};

export default getHoverClasses;
