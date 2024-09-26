import { useThemeContext } from "../../context/ThemeContext";
import { ListItemProps } from "../../utils/types";
import Button from "../Button";

export default function ListItem({ list, handleClick }: ListItemProps) {
  const { theme } = useThemeContext();

  return (
    <li
      className={`${theme === "dark" ? "border-columbia" : "border-jet"} border`}
    >
      <Button
        onClick={handleClick}
        className={`${theme !== "dark" && "hover:bg-jet hover:text-columbia focus:bg-jet focus:text-columbia"} w-full p-2 text-left hover:bg-columbia hover:text-jet focus:bg-columbia focus:text-jet`}
      >
        {list}
      </Button>
    </li>
  );
}
