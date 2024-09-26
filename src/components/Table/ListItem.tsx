import { useThemeContext } from "../../context/ThemeContext";
import { ListItemProps } from "../../utils/types";
import Button from "../Button";

export default function ListItem({ list, handleClick }: ListItemProps) {
  const { theme } = useThemeContext();

  return (
    <li
      className={`${theme === "dark" ? "border-alt_white" : "border-jet"} border`}
    >
      <Button
        onClick={handleClick}
        className={`${theme !== "dark" && "hover:text-alt_white focus:text-alt_white hover:bg-jet focus:bg-jet"} hover:bg-alt_white focus:bg-alt_white w-full p-2 text-left hover:text-jet focus:text-jet`}
      >
        {list}
      </Button>
    </li>
  );
}
