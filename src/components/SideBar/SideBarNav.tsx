import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import projectList from "../../utils/projectList";

type SideBarNavProps = {
  elementVisible: boolean;
};

export default function SideBarNav({ elementVisible }: SideBarNavProps) {
  const { isOpenMenu } = useMenuContext();
  const { theme } = useThemeContext();

  return (
    <section>
      <nav>
        <ul className={`grid gap-y-4 text-xl`}>
          {projectList.map((listItem) => (
            <li
              key={listItem.label}
              className={` ${
                !isOpenMenu
                  ? "w-min -translate-x-1"
                  : `cursor-pointer ${
                      theme === "dark"
                        ? "hover:bg-white hover:text-black focus:bg-white focus:text-black"
                        : "hover:bg-black hover:text-white focus:bg-black focus:text-white"
                    }`
              } relative -left-1 flex items-center gap-3 whitespace-nowrap rounded-md`}
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
                className={`${!elementVisible && "pointer-events-none opacity-0"}`}
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
