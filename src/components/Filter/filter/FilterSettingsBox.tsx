import useThemeContext from "../../../customHooks/useThemeContext";

export default function FilterSettingsBox() {
  const { theme } = useThemeContext();

  return (
    <article
      className={`${theme === "dark" ? "bg-black" : "bg-slate-300"} fixed left-[290px] top-[180px] flex items-start gap-2 rounded-md p-4`}
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta cum dicta
      maiores amet consequuntur expedita doloribus, eligendi temporibus velit
      ratione illo ipsa quam optio quaerat, molestiae tempora, ea obcaecati
      omnis.
    </article>
  );
}
