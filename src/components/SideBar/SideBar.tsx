import { Outlet } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import useThemeContext from "../../customHooks/useThemeContext";
import toggleThemeClasses from "../../utils/toggleThemeClasses";
import SideBarNav from "./SideBarNav";
import SideBarHeader from "./SideBarHeader";

export default function SideBar() {
  const { theme } = useThemeContext();

  return (
    <>
      <aside
        className={toggleThemeClasses(
          theme === "dark" && "bg-[#1e2124]",
          "fixed h-full min-w-[300px] border-r p-4",
        )}
      >
        <SideBarHeader />
        <hr className="mx-auto my-6 w-60 border-2" />
        <SideBarNav />
        <hr className="mx-auto my-6 w-60 border-2" />
        <section className="flex justify-center gap-2">
          <ThemeButton themeName="light" />
          <ThemeButton themeName="dark" />
        </section>
      </aside>

      <Outlet />
    </>
  );
}
