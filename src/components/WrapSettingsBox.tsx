import { useThemeContext } from "../context/ThemeContext";

// #FIXME any type
export default function WrapSettingsBox({ refElem, children }: any) {
  const { theme } = useThemeContext();
  return (
    <article
      ref={refElem}
      className={`${theme === "dark" ? "bg-black" : "bg-slate-300"} absolute top-14 flex items-baseline gap-2 rounded-md p-4`}
    >
      {children}
    </article>
  );
}
