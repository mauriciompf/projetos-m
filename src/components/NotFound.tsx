import { Link } from "react-router-dom";
import Heading from "./Heading";
import { useThemeContext } from "../context/ThemeContext";

export default function NotFound() {
  const { theme } = useThemeContext();

  return (
    <main
      className={`${theme === "dark" && "bg-[#181a1b] text-white"} grid h-screen place-items-center text-center`}
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
            className={`${theme === "dark" ? "bg-white text-black hover:border-gray-300 hover:bg-[#181a1b] hover:text-white focus:border-gray-300 focus:bg-[#181a1b] focus:text-white" : "text-white hover:bg-white hover:text-black focus:bg-white focus:text-[#181a1b]"} rounded-2xl border border-[#181a1b] bg-[#181a1b] p-2 font-bold transition-colors duration-300 ease-in-out`}
            to={"/"}
          >
            Página inicial
          </Link>
        </p>
      </div>
    </main>
  );
}
