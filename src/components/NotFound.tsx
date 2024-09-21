import { Link } from "react-router-dom";
import Heading from "./Heading";
import { useThemeContext } from "../context/ThemeContext";

export default function NotFound() {
  const { theme } = useThemeContext();

  return (
    <main
      className={`${theme === "dark" && "bg-[#181a1b] text-columbia"} grid h-screen place-items-center text-center`}
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
            className={`${theme === "dark" ? "bg-columbia text-jet hover:border-gray-300 hover:bg-[#181a1b] hover:text-columbia focus:border-gray-300 focus:bg-[#181a1b] focus:text-columbia" : "text-columbia hover:bg-columbia hover:text-jet focus:bg-columbia focus:text-[#181a1b]"} rounded-2xl border border-[#181a1b] bg-[#181a1b] p-2 font-bold transition-colors duration-300 ease-in-out`}
            to={"/"}
          >
            Página inicial
          </Link>
        </p>
      </div>
    </main>
  );
}
