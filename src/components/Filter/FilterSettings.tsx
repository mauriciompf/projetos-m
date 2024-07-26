import { useRef, useState } from "react";
// import { createPortal } from "react-dom";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";

import { useThemeContext } from "../../context/ThemeContext";
import FilterBox from "./filter/FilterBox";
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
import toCapitalizeCase from "../../utils/toCapitalizeCase";

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
  const { filtedTableLength, searchParams } = useFilterSearchContext();

  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);
  const handleToggleFilter = () => setToggleFilter((prev) => !prev);
  // console.log(searchParams.get("sortby"));
  // console.log(filtedTableLength);

  const isSortBy = searchParams.get("sortby") && searchParams.get("orderby");
  const isFilter =
    searchParams.has("value") && searchParams.get("value") !== "";

  return (
    <div className="relative mx-auto mb-4 flex w-[80%] items-center justify-between max-2xl:w-[96%]">
      <div className="flex items-center gap-4">
        <div ref={refWrapSortBy} className="relative">
          <Button
            refBtn={refSortByBtn}
            onClick={handleToggleSortBy}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} select-none rounded-md px-2 py-2 font-bold`}
          >
            {/* {sortIcon} ORGANIZAR*/}
            {isSortBy && (
              <span className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-green-400"></span>
            )}
            📂 ORGANIZAR
          </Button>

          {toggleSortBy && (
            <SortByBox
              refSortByBtn={refSortByBtn}
              setToggleSortBy={setToggleSortBy}
            />
          )}
        </div>

        <div ref={refWrapFilter} className="relative">
          <Button
            refBtn={refFilterBtn}
            onClick={handleToggleFilter}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} relative select-none rounded-md px-2 py-2 font-bold`}
          >
            {/* {filterIcon} FILTRO */}
            {isFilter && (
              <span className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-green-400"></span>
            )}
            🔍 FILTRO
          </Button>

          {toggleFilter && (
            <FilterBox
              refFilterBtn={refFilterBtn}
              setToggleFilter={setToggleFilter}
            />
          )}
        </div>

        <div className="grid text-base">
          {isSortBy && (
            <span>
              Ordenado por{" "}
              <strong>{toCapitalizeCase(searchParams.get("sortby"))}</strong> em
              Ordem{" "}
              <strong>{toCapitalizeCase(searchParams.get("orderby"))}</strong>
            </span>
          )}

          {isFilter && (
            <span>
              Filtrado por{" "}
              <strong>{toCapitalizeCase(searchParams.get("filter"))}</strong>:{" "}
              <strong>{toCapitalizeCase(searchParams.get("value"))}</strong>
            </span>
          )}
        </div>
      </div>

      <p className="text-right">
        <em className="opacity-50">
          Exibindo {filtedTableLength} de {tableLength} Resultados
        </em>
      </p>
    </div>
  );
}
