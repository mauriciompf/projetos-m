import { useThemeContext } from "../context/ThemeContext";

const getActiveClasses = (isActive: boolean) => {
  const { theme } = useThemeContext();
  return isActive
    ? theme === "dark"
      ? "bg-columbia text-jet"
      : "bg-jet text-columbia"
    : "";
};
export default getActiveClasses;
