import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useThemeContext } from "../context/ThemeContext";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
const downIcon = (
  <FontAwesomeIcon
    width={15}
    height={15}
    icon={"fa-solid fa-chevron-down" as IconProp}
  />
);
const removeButtonIcon = (
  <FontAwesomeIcon icon={"fa-solid fa-circle-xmark" as IconProp} />
);

type HeaderControlProps = {
  onClick: () => void;
  isDropDownOpen?: boolean;
  headerLabel: string | URLSearchParams | null;
  isRemoveButton?: boolean;
  className?: string;
};

export default function HeaderControl({
  onClick,
  headerLabel,
  isRemoveButton = false,
  className,
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
        {removeButtonIcon}
      </Button>
    </div>
  ) : (
    <Button
      onClick={onClick}
      className={twMerge(
        ` ${theme === "dark" ? "border-white" : "border-black"} flex w-full select-none items-center justify-between gap-2 border p-2`,
        className,
      )}
    >
      <strong>{headerLabel}</strong>

      <span className={`relative text-xl leading-none`}>{downIcon}</span>
    </Button>
  );
}
