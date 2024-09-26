import { Link } from "react-router-dom";
import Heading from "./Heading";
import { useThemeContext } from "../context/ThemeContext";

export default function NotFound() {
  const { theme } = useThemeContext();

  return (
    <main
      className={`${theme === "dark" && "bg-alt_black text-alt_white"} grid h-screen place-items-center text-center`}
    >
      <div className="grid gap-16">
        <div className="grid gap-8 sm:gap-2">
          <Heading className="grid sm:inline-block" as="h1">
            <span>404</span> <span>\(o □ o l|l)/</span>
          </Heading>
          <Heading as="h2">Página não encontrada</Heading>
        </div>

        <p>
          <Link
            className={`${theme === "dark" ? "hover:bg-alt_black focus:bg-alt_black bg-alt_white hover:text-alt_white focus:text-alt_white text-jet hover:border-gray-300 focus:border-gray-300" : "focus:text-alt_black text-alt_white hover:bg-alt_white focus:bg-alt_white hover:text-jet"} border-alt_black bg-alt_black rounded-2xl border p-2 font-bold transition-colors duration-300 ease-in-out`}
            to={"/"}
          >
            Página inicial
          </Link>
        </p>
      </div>
    </main>
  );
}
