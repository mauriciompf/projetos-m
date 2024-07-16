import { useThemeContext } from "../context/ThemeContext";

// #FIXME any type
export default function WrapSettingsBox({ refElem, children }: any) {
  const { theme } = useThemeContext();
  return (
    <article
      ref={refElem}
      className={`${theme === "dark" ? "bg-black" : "bg-slate-300"} fixed left-[290px] top-[180px] flex items-start gap-2 rounded-md p-4`}
    >
      {children}
    </article>
  );
}
