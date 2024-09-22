import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faExpand,
  faTrash,
  faCircleXmark,
  faAngleRight,
  faAngleLeft,
  faSun,
  faMoon,
  faSquareCaretLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
export const plusIcon = <FontAwesomeIcon icon={faPlus} />;
export const expandIcon = <FontAwesomeIcon icon={faExpand} />;
export const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
export const closeIcon = <FontAwesomeIcon icon={faCircleXmark} />;
export const nextIcon = <FontAwesomeIcon icon={faAngleRight} />;
export const previousIcon = <FontAwesomeIcon icon={faAngleLeft} />;
export const lightIcon = <FontAwesomeIcon icon={faSun} />;
export const darkIcon = <FontAwesomeIcon width="16px" icon={faMoon} />;
export const hideMenuIcon = <FontAwesomeIcon icon={faSquareCaretLeft} />;
export const downIcon = (
  <FontAwesomeIcon width={15} height={15} icon={faChevronDown} />
);
