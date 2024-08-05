import { Link } from "react-router-dom";
import projectList from "../../utils/projectList";

export default function HomeMain() {
  return (
    <main>
      <section className="grid place-items-center">
        <ul className={`flex flex-col gap-4 sm:flex-row`}>
          {projectList.map((project, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-2xl bg-[#4363D2] text-white shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <Link
                to={"/mauricioProjetos/pages/filter"}
                className="grid aspect-video size-60 text-center text-2xl"
              >
                <img
                  src={project.demoImg}
                  draggable={false}
                  className="rounded-t-2xl"
                  alt=""
                />
                {project.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
