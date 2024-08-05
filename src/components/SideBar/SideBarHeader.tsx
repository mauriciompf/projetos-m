import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useMenuContext } from "../../context/MenuContext";
import Button from "../Button";

const hideMenuIcon = <FontAwesomeIcon icon={faSquareCaretLeft} />;

export default function SideBarHeader() {
  const { isOpenMenu, handleToggleMenu } = useMenuContext();
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    if (isOpenMenu) {
      const timer = setTimeout(() => setHeadingVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setHeadingVisible(false);
    }
  }, [isOpenMenu]);

  return (
    <section className={`relative my-4 ml-0.5 flex items-center gap-6`}>
      <span className="sr-only">
        {isOpenMenu ? "Reduza o menu" : "Amplie o menu"}
      </span>
      <Button
        aria-label="toggleMenu"
        onClick={handleToggleMenu}
        className={`${!isOpenMenu && "rotate-180"} transform-gpu p-0 text-2xl transition-[rotate] duration-300`}
      >
        <span className="grid">{hideMenuIcon}</span>
      </Button>
      <Heading
        className={`${!headingVisible && "opacity-0 transition-opacity"} relative`}
        as="h2"
      >
        <Link
          className={`${!isOpenMenu && "pointer-events-none"} flex items-center gap-2`}
          to={"/"}
        >
          <span className="cursor-pointer text-lg">🏠</span>
          <span className="text-2xl hover:underline focus:underline">
            Projetos
          </span>
        </Link>
      </Heading>
    </section>
  );
}
