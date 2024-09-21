import { NavLink } from "react-router-dom";
import type { ProjectLink } from "../../utils/types";
import { useMenuContext } from "../../context/MenuContext";
import getHoverClasses from "../../utils/getHoverClasses";
import getActiveClasses from "../../utils/getActiveClasses";

export default function ProjectLink({ project, elementVisible }: ProjectLink) {
  const { isMenuOpen } = useMenuContext();

  return (
    <NavLink
      className={({ isActive }) =>
        `${getActiveClasses(isActive)} ${isMenuOpen ? `${getHoverClasses()} cursor-pointer` : "w-min -translate-x-1"} relative -left-1 flex items-center gap-3 whitespace-nowrap rounded-md transition-all duration-100`
      }
      to={project.path}
    >
      <span
        className={`${!isMenuOpen && getHoverClasses()} cursor-pointer rounded-md p-2 text-lg`}
      >
        {project.icon}
      </span>
      <span
        className={`${!elementVisible ? "pointer-events-none hidden opacity-0" : ""}`}
      >
        {project.label}
      </span>
    </NavLink>
  );
}
