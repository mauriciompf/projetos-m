import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const darkIcon = <FontAwesomeIcon icon={faMoon} />;
const lightIcon = <FontAwesomeIcon icon={faSun} />;

function HomePage() {
  return (
    <div className="mx-auto grid h-screen w-[70%] gap-10 py-12">
      <header className="flex items-center justify-center gap-6 text-center">
        <div>
          <h1>Projetos</h1>
          <hr />
        </div>
        <ul className="flex gap-4">
          <li>
            <Button>
              <span>{lightIcon}</span>
              <span>Light</span>
            </Button>
          </li>
          <li>
            <Button>
              <span>{darkIcon}</span>
              <span>Dark</span>
            </Button>
          </li>
        </ul>
      </header>
      <main>
        <nav className="grid place-items-center">
          <ul className="grid grid-cols-3 gap-4">
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
            <li className="size-60 rounded-md bg-slate-400 transition-all duration-300 hover:scale-110"></li>
          </ul>
        </nav>
      </main>
      <footer className="text-center">
        <em>
          <strong>Maurício.</strong>
        </em>
      </footer>
    </div>
  );
}

export default HomePage;
