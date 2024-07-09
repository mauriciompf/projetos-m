import { Outlet } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import useThemeContext from "../../customHooks/useThemeContext";
// import toggleThemeClasses from "../../utils/toggleThemeClasses";
import SideBarNav from "./SideBarNav";
import SideBarHeader from "./SideBarHeader";
import useIsOpenMenu from "../../customHooks/useIsOpenMenuContext";
// import toggleThemeClasses from "../../utils/toggleThemeClasses";

export default function SideBar() {
  // const [isOpenMenu, setIsOpenMenu] = useState(true);
  const { isOpenMenu } = useIsOpenMenu();
  const { theme } = useThemeContext();

  return (
    <>
      <aside
        className={`${theme === "dark" && "bg-[#1e2124]"} ${isOpenMenu ? "w-[300px]" : "w-[60px]"} fixed h-full overflow-hidden border-r p-4 transition-all duration-500`}
      >
        <SideBarHeader />
        <hr className="mx-auto my-6 w-auto border-2" />
        <SideBarNav />
        <hr className="mx-auto my-6 w-auto border-2" />
        <section className={"flex justify-center gap-2"}>
          <ThemeButton
            className={`${!isOpenMenu && "translate-x-[1.4rem] translate-y-0"} relative transition-all duration-500`}
            themeName="light"
          />
          <ThemeButton
            className={`${!isOpenMenu && "-translate-x-[1.4rem] translate-y-10"} relative transition-all duration-500`}
            isOpenMenu={isOpenMenu}
            themeName="dark"
          />
        </section>
      </aside>

      <Outlet />
    </>
  );
}
