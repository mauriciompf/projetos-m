import { useThemeContext } from "../../../context/ThemeContext";
import Button from "../../Button";

// FIXME any type
export default function SortByListItem({ list, handleClick }: any) {
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
