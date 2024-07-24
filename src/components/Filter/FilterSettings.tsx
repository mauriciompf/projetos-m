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
import { useFilterSearchContext } from "../../context/FilterSearchContext";

library.add(faSortDown, faSortUp, faSquareXmark);
// const sortIcon = <FontAwesomeIcon icon={faSort} />;
// const filterIcon = <FontAwesomeIcon icon={faFilter} />;

export default function FilterSettings({
  tableLength,
}: {
  tableLength: number;
}) {
  const { theme } = useThemeContext();
  // HACK Custom hook
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);
  const refWrapSortBy = useRef<HTMLDivElement | null>(null);
  const refWrapFilter = useRef(null);
  const refFilterBtn = useRef(null);
  const { currentTableLength, searchParams } = useFilterSearchContext();

  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);
  const handleToggleFilter = () => setToggleFilter((prev) => !prev);
  // console.log(searchParams.get("filter"));

  return (
    <div className="relative mx-auto mb-6 flex w-[80%] items-center justify-between">
      <div className="flex gap-4">
        <div ref={refWrapSortBy} className="relative">
          <Button
            refBtn={refSortByBtn}
            onClick={handleToggleSortBy}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} select-none rounded-md px-2 py-2 font-bold`}
          >
            {/* {sortIcon} ORGANIZAR*/}
            {searchParams.has("sortby") && (
              <span className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-green-400"></span>
            )}
            📂 ORGANIZAR
          </Button>
        </div>

        <div ref={refWrapFilter} className="relative">
          <Button
            refBtn={refFilterBtn}
            onClick={handleToggleFilter}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} relative select-none rounded-md px-2 py-2 font-bold`}
          >
            {/* {filterIcon} FILTRO */}
            {searchParams.has("value") && searchParams.get("value") !== "" && (
              <span className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-green-400"></span>
            )}
            🔍 FILTRO
          </Button>
        </div>
      </div>

      <p>
        <em className="opacity-50">
          Exibindo {currentTableLength} de {tableLength} Resultados
        </em>
      </p>
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
