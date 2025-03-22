import { useMenuContext } from "../../context/MenuContext";
import { externalLinkIcon, githubIcon } from "../../utils/icons";
import projectList from "../../utils/projectList";
import HorizontalLine from "./HorizontalLine";
import ProjectLink from "./ProjectLink";

export default function SideBarNav({
  elementVisible,
}: {
  elementVisible: boolean;
}) {
  const { isMenuOpen } = useMenuContext();

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

        <HorizontalLine />

        <p
          title="Repositório"
          className="mx-auto grid w-full place-items-center tracking-widest hover:ring-2 hover:ring-savoy focus:ring-2 focus:ring-savoy"
        >
          <em>
            <a
              href="https://github.com/mauriciompf/projetos-m"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isMenuOpen ? (
                <span
                  className={`${!elementVisible ? "hidden" : ""} cursor-pointer rounded-md p-2 text-lg`}
                >
                  <span className="underline">Documentação</span>{" "}
                  {externalLinkIcon}
                </span>
              ) : (
                <span className={`text-xl`}>{githubIcon}</span>
              )}
            </a>
          </em>
        </p>
      </nav>
    </section>
  );
}
