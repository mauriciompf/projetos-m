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
