import { useThemeContext } from "../context/ThemeContext";

const getHoverClasses = () => {
  const { theme } = useThemeContext();
  return theme === "dark"
    ? "hover:bg-columbia hover:text-jet focus:bg-columbia focus:text-jet"
    : "hover:bg-jet hover:text-columbia focus:bg-jet focus:text-columbia";
};

export default getHoverClasses;
