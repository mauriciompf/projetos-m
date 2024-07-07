import { Outlet } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import useThemeContext from "../../customHooks/useThemeContext";
import { useState } from "react";
// import toggleThemeClasses from "../../utils/toggleThemeClasses";
import SideBarNav from "./SideBarNav";
import SideBarHeader from "./SideBarHeader";

export default function SideBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const { theme } = useThemeContext();

  return (
    <>
      <aside
        className={`${theme === "dark" && "bg-[#1e2124]"} ${isOpenMenu ? "w-[300px]" : "w-[60px]"} fixed h-full overflow-hidden border-r p-4 transition-all duration-500`}
      >
        <SideBarHeader setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
        <hr className="mx-auto my-6 w-auto border-2" />
        <SideBarNav setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
        <hr className="mx-auto my-6 w-auto border-2" />
        <section className="flex justify-center gap-2">
          <ThemeButton themeName="light" />
          <ThemeButton themeName="dark" />
        </section>
      </aside>

      <Outlet />
    </>
  );
}
