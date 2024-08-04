import { twMerge } from "tailwind-merge";
import { useThemeContext } from "../context/ThemeContext";
import { RefObject } from "react";

type WrapSettingsBoxProps = {
  refElem: RefObject<HTMLElement>;
  children: React.ReactNode;
  className: string;
};

export default function WrapSettingsBox({
  refElem,
  children,
  className,
}: WrapSettingsBoxProps) {
  const { theme } = useThemeContext();
  return (
    <article
      ref={refElem}
      className={twMerge(
        `${theme === "dark" ? "border-none bg-[#25282A]" : "bg-white"} absolute left-0 top-14 z-50 flex w-max items-baseline rounded-md border border-gray-300 p-4 shadow-2xl`,
        className,
      )}
    >
      {children}
    </article>
  );
}
