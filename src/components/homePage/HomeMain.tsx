import { Link } from "react-router-dom";

export default function HomeMain({}) {
  return (
    <main>
      <section className="grid place-items-center">
        <ul className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <li
              key={index}
              className="size-60 cursor-pointer rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"
            >
              <Link
                to={"../pages/filter"}
                className="grid size-60 place-items-center text-2xl"
              >
                Filter
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
