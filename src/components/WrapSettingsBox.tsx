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
        `${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} absolute left-0 top-14 z-50 flex w-max items-baseline gap-2 rounded-md p-4`,
        className,
      )}
    >
      {children}
    </article>
  );
}
