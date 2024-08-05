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
      className={`${theme === "dark" ? "border-white" : "border-black"} border`}
    >
      <Button
        onClick={handleClick}
        className={`${theme !== "dark" && "hover:bg-black hover:text-white focus:bg-black focus:text-white"} w-full p-2 text-left hover:bg-white hover:text-black focus:bg-white focus:text-black`}
      >
        {list}
      </Button>
    </li>
  );
}
