import { useRef } from "react";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";
import { useThemeContext } from "../../context/ThemeContext";
import FilterBox from "./filter/FilterBox";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useFilterSearchContext } from "../../context/FilterSearchContext";
import toCapitalizeCase from "../../utils/toCapitalizeCase";
import { tableLength } from "../../pages/Filter";
import useFilterSettings from "../../customHooks/useFilterSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const downIcon = (
  <FontAwesomeIcon
    width={15}
    height={15}
    icon={"fa-solid fa-chevron-down" as IconProp}
  />
);

// FontAwesome library
library.add(faCircleXmark, faChevronDown);

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

  const buttonSettingsClass = `${theme === "dark" && "bg-[#25282A] border-none"} border border-gray-300 relative select-none rounded-3xl px-2 py-2 font-bold`;
  const onBoxClass = `${toggleSortBy && "animate-pulse"} absolute -right-0 -top-0 size-3 rounded-full bg-green-400 z-50`;

  return (
    <div
      className={`${theme === "dark" ? "bg-[#181a1b]" : "bg-white"} sticky top-0 z-10 flex items-center justify-between py-4`}
    >
      <div className="flex items-center gap-4">
        {/* Sort By Button and Box */}
        <div ref={refWrapSortBy} className="relative">
          <Button
            refBtn={refSortByBtn}
            onClick={handleToggleSortBy}
            className={buttonSettingsClass}
          >
            {isSortBy && <span className={onBoxClass}></span>}
            <strong>
              {toggleSortBy ? "📂" : "📁"} Organizar {downIcon}
            </strong>
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
            className={buttonSettingsClass}
          >
            {isFilter && <span className={onBoxClass}></span>}
            <strong>🔍 Filtrar {downIcon}</strong>
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
        <em className="">
          Exibindo {filtedTableLength} de {tableLength} Resultados
        </em>
      </p>
    </div>
  );
}
