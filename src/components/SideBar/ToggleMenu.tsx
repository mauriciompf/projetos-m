import { useMenuContext } from "../../context/MenuContext";
import { hideMenuIcon } from "../../utils/icons";
import Button from "../Button";

export default function ToggleMenu() {
  const { isMenuOpen, setIsMenuOpen } = useMenuContext();
  return (
    <>
      <Button
        aria-label={isMenuOpen ? "Reduza o menu" : "Amplie o menu"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${!isMenuOpen && "rotate-180"} p-0 text-2xl transition-[rotate] duration-100`}
      >
        <span className="grid">{hideMenuIcon}</span>
      </Button>
    </>
  );
}
