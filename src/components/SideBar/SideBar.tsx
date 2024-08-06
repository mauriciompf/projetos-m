import { Outlet } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import SideBarNav from "./SideBarNav";
import SideBarHeader from "./SideBarHeader";
import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useElementVisibility } from "../../customHooks/useElementVisibility";

export default function SideBar() {
  const { isOpenMenu } = useMenuContext();
  const { theme } = useThemeContext();
  const { elementVisible } = useElementVisibility();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <aside
        className={`${theme === "dark" && "bg-[#1e2124]"} ${isOpenMenu ? "w-[260px]" : "w-[60px]"} fixed z-50 h-full border-r border-gray-300 p-4 transition-all duration-300 ease-in-out`}
      >
        <SideBarHeader elementVisible={elementVisible} />
        <hr className="mx-auto my-6 w-auto rounded-full border-2 border-gray-300" />
        <SideBarNav elementVisible={elementVisible} />
        <hr className="mx-auto my-6 w-auto rounded-full border-2 border-gray-300" />
        <section className={`flex justify-center ${isOpenMenu && "gap-2"} `}>
          <ThemeButton
            className={`${!isOpenMenu && "translate-x-[1rem] translate-y-0"} relative ${!isHomePage && isOpenMenu ? "gap-2" : "gap-0"} transition-transform duration-300 ease-in-out`}
            themeName="light"
          />
          <ThemeButton
            className={`${!isOpenMenu && "-translate-x-[1rem] translate-y-10"} ${!isHomePage && isOpenMenu ? "gap-2" : "gap-0"} transition-transform duration-300 ease-in-out`}
            isOpenMenu={isOpenMenu}
            themeName="dark"
          />
        </section>
      </aside>

      <Outlet />
    </>
  );
}
