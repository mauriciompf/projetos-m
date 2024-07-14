import useThemeContext from "../../../customHooks/useThemeContext";
import Button from "../../Button";

export default function SortByListItem({ list, handleClick }: any) {
  const { theme } = useThemeContext();

  return (
    <li
      className={`${theme === "dark" ? "border-white" : "border-black"} border`}
      key={list}
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
