import SideBarNav from "./SideBarNav";
import SideBarHeader from "./SideBarHeader";
import { useMenuContext } from "../../context/MenuContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useElementVisibility } from "../../customHooks/useElementVisibility";
import HorizontalLine from "./HorizontalLine";

export default function SideBar() {
  const { isMenuOpen } = useMenuContext();
  const { theme } = useThemeContext();
  const { elementVisible } = useElementVisibility();

  return (
    <>
      <aside
        className={`${theme === "dark" ? "bg-jet" : "bg-alt_white"} ${isMenuOpen ? "w-[16.25rem]" : "w-[3.75rem]"} fixed z-50 h-full border-r border-gray-300 p-4 transition-all duration-300 ease-in-out`}
      >
        <SideBarHeader elementVisible={elementVisible} />

        <HorizontalLine />

        <SideBarNav elementVisible={elementVisible} />
      </aside>
    </>
  );
}
