import { useThemeContext } from "../context/ThemeContext";
import Button from "./Button";

type ListItemProps = {
  list: string;
  handleClick: () => void;
};

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
