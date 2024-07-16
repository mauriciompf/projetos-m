import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import projectList from "../../utils/projectList";
import toggleThemeClasses from "../../utils/toggleThemeClasses";

export default function SideBarNav() {
  const { isOpenMenu } = useMenuContext();
  const { theme } = useThemeContext();

  return (
    <section className={toggleThemeClasses(isOpenMenu && "ml-5")}>
      <nav>
        <ul className={`grid gap-y-4 text-xl`}>
          {projectList.map((listItem) => (
            <li
              key={listItem.label}
              className={toggleThemeClasses(
                !isOpenMenu
                  ? "w-min -translate-x-1"
                  : `cursor-pointer ${
                      theme === "dark"
                        ? "hover:bg-white hover:text-black focus:bg-white focus:text-black"
                        : "hover:bg-black hover:text-white focus:bg-black focus:text-white"
                    }`,
                "relative flex items-center gap-6 rounded-md",
              )}
            >
              <span
                className={`${
                  !isOpenMenu &&
                  ` ${
                    theme === "dark"
                      ? "hover:bg-white hover:text-black focus:bg-white focus:text-black"
                      : "hover:bg-black hover:text-white focus:bg-black focus:text-white"
                  }`
                } cursor-pointer rounded-md p-2 text-lg`}
              >
                {listItem.icon}
              </span>
              <span
                className={`${!isOpenMenu && "pointer-events-none opacity-0 transition-opacity"}`}
              >
                {listItem.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
