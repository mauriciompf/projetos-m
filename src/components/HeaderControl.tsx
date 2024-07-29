import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useThemeContext } from "../context/ThemeContext";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const upIcon = <FontAwesomeIcon icon={"fa-solid fa-sort-up" as IconProp} />;
const downIcon = <FontAwesomeIcon icon={"fa-solid fa-sort-down" as IconProp} />;
const removeButton = (
  <FontAwesomeIcon icon={"fa-solid fa-square-xmark" as IconProp} />
);

type HeaderControlProps = {
  onClick: () => void;
  isDropDownOpen?: boolean;
  headerLabel: string | URLSearchParams | null;
  isRemoveButton?: boolean;
};

export default function HeaderControl({
  onClick,
  isDropDownOpen,
  headerLabel,
  isRemoveButton = false,
}: HeaderControlProps) {
  const { theme } = useThemeContext();

  return isRemoveButton ? (
    <div
      className={`${theme === "dark" ? "border-white" : "border-black"} flex select-none items-center gap-1 border border-black p-2`}
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
      className={`flex w-full select-none items-center gap-2 border p-2 ${theme === "dark" ? "border-white" : "border-black"} `}
    >
      <span>{headerLabel}</span>

      <span
        className={`relative ${isDropDownOpen ? "top-[.25rem]" : "-top-[.25rem]"} text-xl leading-none`}
      >
        {isDropDownOpen ? upIcon : downIcon}
      </span>
    </Button>
  );
}
