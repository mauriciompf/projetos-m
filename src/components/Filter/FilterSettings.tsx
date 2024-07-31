import { useRef } from "react";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";
import { useThemeContext } from "../../context/ThemeContext";
import FilterBox from "./filter/FilterBox";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSortDown,
  faSortUp,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useFilterSearchContext } from "../../context/FilterSearchContext";
import toCapitalizeCase from "../../utils/toCapitalizeCase";
import { tableLength } from "../../pages/Filter";
import useFilterSettings from "../../customHooks/useFilterSettings";

// FontAwesome library
library.add(faSortDown, faSortUp, faSquareXmark);

export default function FilterSettings() {
  const { theme } = useThemeContext();
  const { filtedTableLength, searchParams, statusParams } =
    useFilterSearchContext();
  const {
    toggleFilter,
    toggleSortBy,
    handleToggleSortBy,
    handleToggleFilter,
    isSortBy,
    isFilter,
    setToggleSortBy,
    setToggleFilter,
  } = useFilterSettings();

  // Define refs for buttons and wrapper divs
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);
  const refWrapSortBy = useRef<HTMLDivElement | null>(null);
  const refWrapFilter = useRef<HTMLDivElement | null>(null);
  const refFilterBtn = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Sort By Button and Box */}
        <div ref={refWrapSortBy} className="relative">
          <Button
            refBtn={refSortByBtn}
            onClick={handleToggleSortBy}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} select-none rounded-md px-2 py-2 font-bold`}
          >
            {isSortBy && (
              <span
                className={`absolute -right-1 -top-1 size-3 ${toggleSortBy && "animate-pulse"} rounded-full bg-green-400`}
              ></span>
            )}
            {toggleSortBy ? "📂" : "📁"} Organizar
          </Button>

          {toggleSortBy && (
            <SortByBox
              refSortByBtn={refSortByBtn}
              setToggleSortBy={setToggleSortBy}
            />
          )}
        </div>

        {/* Filter Button and Box */}
        <div ref={refWrapFilter} className="relative">
          <Button
            refBtn={refFilterBtn}
            onClick={handleToggleFilter}
            className={`${theme === "dark" ? "bg-[#25282A]" : "bg-slate-300"} relative select-none rounded-md px-2 py-2 font-bold`}
          >
            {isFilter && (
              <span
                className={`absolute -right-1 -top-1 size-3 ${toggleFilter && "animate-pulse"} rounded-full bg-green-400`}
              ></span>
            )}
            🔍 Filtrar
          </Button>

          {toggleFilter && (
            <FilterBox
              refFilterBtn={refFilterBtn}
              setToggleFilter={setToggleFilter}
            />
          )}
        </div>

        {/* Sorting and Filtering Info */}
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
              <strong>{toCapitalizeCase(searchParams.get("filter"))}</strong>
              {statusParams.has("status")
                ? ` (${statusParams.get("status")})`
                : ":"}{" "}
              <strong>{toCapitalizeCase(searchParams.get("value"))}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Results Info */}
      <p className="text-right">
        <em className="opacity-50">
          Exibindo {filtedTableLength} de {tableLength} Resultados
        </em>
      </p>
    </div>
  );
}
