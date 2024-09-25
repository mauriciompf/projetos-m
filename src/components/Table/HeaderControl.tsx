import { useThemeContext } from "../../context/ThemeContext";
import { closeIcon, downIcon } from "../../utils/icons";
import Button from "../Button";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        `${theme === "dark" ? "border-columbia" : "border-jet"} flex select-none items-center justify-between gap-1 border p-2`,
        className,
      )}
    >
      <span className="font-bold">{headerLabel}</span>
      <Button
        onClick={onClick}
        className="py-0 ring-transparent hover:text-red-500 focus:text-red-500"
      >
        {closeIcon}
      </Button>
    </div>
  ) : (
    <Button
      onClick={onClick}
      className={twMerge(
        ` ${theme === "dark" ? "border-columbia" : "border-jet"} flex w-full select-none items-center justify-between gap-2 border p-2`,
        className,
      )}
    >
      <strong>{headerLabel}</strong>

      <span className={`relative text-xl leading-none`}>{downIcon}</span>
    </Button>
  );
}
