import { NavLink } from "react-router-dom";
import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import projectList from "../../utils/projectList";

type SideBarNavProps = {
  elementVisible: boolean;
};

export default function SideBarNav({ elementVisible }: SideBarNavProps) {
  const { isOpenMenu } = useMenuContext();
  const { theme } = useThemeContext();

  const onHoverDarkClass =
    "hover:bg-white hover:text-black focus:bg-white focus:text-black";
  const onHoverLightClass =
    "hover:bg-black hover:text-white focus:bg-black focus:text-white";

  return (
    <section>
      <nav>
        <ul className={`grid gap-y-4 text-xl`}>
          {projectList.map((project) => (
            <li key={project.label}>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? (theme === "dark" ? "bg-white text-black" : "bg-black text-white") : ""} ${
                    !isOpenMenu
                      ? "w-min -translate-x-1"
                      : `${theme === "dark" ? onHoverDarkClass : onHoverLightClass} cursor-pointer`
                  } relative -left-1 flex items-center gap-3 whitespace-nowrap rounded-md`
                }
                to={project.path}
              >
                <span
                  className={`${
                    !isOpenMenu &&
                    ` ${
                      theme === "dark" ? onHoverDarkClass : onHoverLightClass
                    }`
                  } cursor-pointer rounded-md p-2 text-lg`}
                >
                  {project.icon}
                </span>
                <span
                  className={`${!elementVisible && "pointer-events-none hidden opacity-0"}`}
                >
                  {project.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
