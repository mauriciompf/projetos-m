import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";

import FilterSettingsBox from "./filter/FilterSettingsBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../../context/ThemeContext";

const sortIcon = <FontAwesomeIcon icon={faSort} />;
const filterIcon = <FontAwesomeIcon icon={faFilter} />;
const downIcon = <FontAwesomeIcon icon={faSortDown} />;
const upIcon = <FontAwesomeIcon icon={faSortUp} />;

type FilterSettingsProps = {
  orderBy: string;
  setOrderBy: (val: string) => void;
  selectColumn: string;
  setSelectColumn: (val: string) => void;
};

export default function FilterSettings() {
  const { theme } = useThemeContext();
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);

  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);

  const handleToggleFilter = () => setToggleFilter((prev) => !prev);

  return (
    <div className="relative mx-auto mb-6 flex w-[80%] items-center gap-4">
      <Button
        refBtn={refSortByBtn}
        onClick={handleToggleSortBy}
        className={`rounded-md ${theme === "dark" ? "bg-black" : "bg-slate-300"} px-4 py-2 font-bold`}
      >
        {sortIcon} ORGANIZAR
      </Button>

      <Button
        onClick={handleToggleFilter}
        className={`rounded-md ${theme === "dark" ? "bg-black" : "bg-slate-300"} px-4 py-2 font-bold`}
      >
        {filterIcon} FILTRO
      </Button>

      <span>Show x/y</span>

      {toggleSortBy &&
        createPortal(
          <SortByBox
            refSortByBtn={refSortByBtn}
            setToggleSortBy={setToggleSortBy}
            downIcon={downIcon}
            upIcon={upIcon}
          />,
          document.body,
        )}

      {toggleFilter && createPortal(<FilterSettingsBox />, document.body)}
    </div>
  );
}
