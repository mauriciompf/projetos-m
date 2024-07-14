import useThemeContext from "../../../customHooks/useThemeContext";
import Button from "../../Button";

type SortByHeaderProps = {
  onClick: () => void;
  isOrderByOpen?: boolean;
  upIcon?: any;
  downIcon?: any;
  headerLabel: string;
  isRemoveButton?: any;
  removeButton?: any;
};

export default function SortByHeader({
  onClick,
  isOrderByOpen,
  upIcon,
  downIcon,
  headerLabel,
  isRemoveButton = false,
  removeButton,
}: SortByHeaderProps) {
  const { theme } = useThemeContext();

  return isRemoveButton ? (
    <div
      className={`${theme === "dark" ? "border-white" : "border-black"} flex items-center gap-1 border border-black p-2`}
    >
      <span className="font-bold">{headerLabel}</span>
      <Button
        onClick={onClick}
        className="py-0 ring-transparent hover:text-red-500 focus:text-red-500"
      >
        {removeButton}
      </Button>
    </div>
  ) : (
    <Button
      onClick={onClick}
      className={`flex items-center gap-2 border p-2 ${theme === "dark" ? "border-white" : "border-black"} `}
    >
      <span>{headerLabel}</span>

      <span
        className={`relative ${isOrderByOpen ? "top-[.25rem]" : "-top-[.25rem]"} text-xl leading-none`}
      >
        {isOrderByOpen ? upIcon : downIcon}
      </span>
    </Button>
  );
}
