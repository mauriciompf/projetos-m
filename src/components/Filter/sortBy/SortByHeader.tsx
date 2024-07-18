import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useThemeContext } from "../../../context/ThemeContext";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const upIcon = <FontAwesomeIcon icon={"fa-solid fa-sort-up" as IconProp} />;
const downIcon = <FontAwesomeIcon icon={"fa-solid fa-sort-down" as IconProp} />;

// FIXME any type
type SortByHeaderProps = {
  onClick: () => void;
  isOrderByOpen?: boolean;
  headerLabel: string;
  isRemoveButton?: any;
  removeButton?: any;
};

export default function SortByHeader({
  onClick,
  isOrderByOpen,
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
      className={`flex w-full items-center gap-2 border p-2 ${theme === "dark" ? "border-white" : "border-black"} `}
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
