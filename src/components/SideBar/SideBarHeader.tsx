import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

const hideMenuIcon = <FontAwesomeIcon icon={faSquareCaretLeft} />;
const homeIcon = <FontAwesomeIcon icon={faHouse} />;

export default function SideBarHeader({ setIsOpenMenu, isOpenMenu }: any) {
  const [headingVisible, setHeadingVisible] = useState(false);

  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    if (isOpenMenu) {
      const timer = setTimeout(() => setHeadingVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setHeadingVisible(false);
    }
  }, [isOpenMenu]);

  return (
    <section
      className={` ${isOpenMenu && "ml-5"} relative my-4 flex items-center justify-between transition-all duration-300 ease-in-out`}
    >
      <Heading
        className={`${!headingVisible && "opacity-0"} relative text-nowrap transition-opacity duration-200 ease-in-out`}
        as="h1"
      >
        <Link
          className={`${!isOpenMenu && "pointer-events-none"} flex items-center gap-2`}
          to={"/"}
        >
          <span className="cursor-pointer text-lg">{homeIcon}</span>
          <span className="text-2xl">Meus Projetos</span>
        </Link>
      </Heading>
      <span className="sr-only">Minimizar o menu</span>
      <button
        onClick={handleToggleMenu}
        className={`${isOpenMenu && "right-0 mr-4"} absolute right-[4px] text-2xl transition-all duration-300 ease-in-out`}
      >
        {hideMenuIcon}
      </button>
    </section>
  );
}
