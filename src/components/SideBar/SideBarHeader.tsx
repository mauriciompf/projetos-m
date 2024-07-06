import { Link } from "react-router-dom";
import Heading from "../Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
const hideMenuIcon = <FontAwesomeIcon icon={faSquareCaretLeft} />;
const homeIcon = <FontAwesomeIcon icon={faHouse} />;

export default function SideBarHeader() {
  return (
    <section className="ml-5 flex items-center justify-between">
      <Heading as="h1">
        <Link className="flex items-center gap-2" to={"/"}>
          <span className="cursor-pointer text-lg">{homeIcon}</span>
          <span className="text-2xl">Meus Projetos</span>
        </Link>
      </Heading>
      <span className="sr-only">Minimizar o menu</span>
      <button className="mr-4 text-2xl">{hideMenuIcon}</button>
    </section>
  );
}
