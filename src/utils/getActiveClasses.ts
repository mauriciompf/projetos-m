import { useThemeContext } from "../context/ThemeContext";

const getActiveClasses = (isActive: boolean) => {
  const { theme } = useThemeContext();
  return isActive
    ? theme === "dark"
      ? "bg-alt_white text-jet"
      : "bg-jet text-alt_white"
    : "";
};
export default getActiveClasses;
