import projectList from "../../utils/projectList";
import ProjectLink from "./ProjectLink";

export default function SideBarNav({
  elementVisible,
}: {
  elementVisible: boolean;
}) {
  return (
    <section>
      <nav>
        <ul className="grid gap-y-4 text-xl">
          {projectList.map((project) => (
            <li key={project.label}>
              <ProjectLink project={project} elementVisible={elementVisible} />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
