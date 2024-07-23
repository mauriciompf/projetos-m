import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";

import { useThemeContext } from "../../context/ThemeContext";
import FilterSettingsBox from "./filter/FilterSettingsBox";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  // faFilter,
  // faSort,
  faSortDown,
  faSortUp,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSortDown, faSortUp, faSquareXmark);
// const sortIcon = <FontAwesomeIcon icon={faSort} />;
// const filterIcon = <FontAwesomeIcon icon={faFilter} />;

export default function FilterSettings() {
  const { theme } = useThemeContext();
  // HACK Custom hook
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);
  const refWrapSortBy = useRef<HTMLDivElement | null>(null);
  const refWrapFilter = useRef(null);
  const refFilterBtn = useRef(null);

  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);
  const handleToggleFilter = () => setToggleFilter((prev) => !prev);

  return (
    <div className="relative mx-auto mb-6 flex w-[80%] items-center gap-4">
      <div ref={refWrapSortBy} className="relative">
        <Button
          refBtn={refSortByBtn}
          onClick={handleToggleSortBy}
          className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} select-none rounded-md px-2 py-2 font-bold`}
        >
          {/* {sortIcon} ORGANIZAR*/}
          📂 ORGANIZAR
        </Button>
      </div>

      <div ref={refWrapFilter} className="relative">
        <Button
          refBtn={refFilterBtn}
          onClick={handleToggleFilter}
          className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} select-none rounded-md px-2 py-2 font-bold`}
        >
          {/* {filterIcon} FILTRO */}
          🔍 FILTRO
        </Button>
      </div>

      <span>Show x/y</span>

      {toggleSortBy &&
        createPortal(
          <SortByBox
            refSortByBtn={refSortByBtn}
            setToggleSortBy={setToggleSortBy}
          />,
          refWrapSortBy.current!,
        )}

      {toggleFilter &&
        createPortal(
          <FilterSettingsBox
            refFilterBtn={refFilterBtn}
            setToggleFilter={setToggleFilter}
          />,
          refWrapFilter.current!,
        )}
    </div>
  );
}
