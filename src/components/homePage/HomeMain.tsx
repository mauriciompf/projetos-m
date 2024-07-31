import { Link } from "react-router-dom";
import projectList from "../../utils/projectList";

export default function HomeMain() {
  return (
    <main>
      <section className="grid place-items-center">
        <ul className={`grid grid-cols-${projectList.length} gap-4`}>
          {projectList.map((project, index) => (
            <li
              key={index}
              className="size-60 cursor-pointer rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"
            >
              <Link
                to={"../pages/filter"}
                className="grid size-60 place-items-center text-2xl"
              >
                {project.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
