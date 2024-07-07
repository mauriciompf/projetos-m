import useThemeContext from "../../customHooks/useThemeContext";
import projectList from "../../utils/projectList";
import toggleThemeClasses from "../../utils/toggleThemeClasses";

export default function SideBarNav({ isOpenMenu }: any) {
  const { theme } = useThemeContext();
  return (
    <section className={toggleThemeClasses(isOpenMenu && "ml-5")}>
      <nav>
        <ul className="grid gap-4 text-xl">
          {projectList.map((listItem) => (
            <li
              key={listItem.label}
              className={toggleThemeClasses(
                theme === "dark"
                  ? "hover:bg-white hover:text-black focus:bg-white focus:text-black"
                  : "hover:bg-black hover:text-white focus:bg-black focus:text-white",
                "flex w-min cursor-pointer items-center gap-6 rounded-md py-2",
              )}
            >
              <span className="text-lg">{listItem.icon}</span>
              <span className="hidden">{listItem.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
