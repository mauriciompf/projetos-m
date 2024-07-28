import { useRef, useState } from "react";
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

library.add(faSortDown, faSortUp, faSquareXmark);

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
  const { filtedTableLength, searchParams, statusParams } =
    useFilterSearchContext();

  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);
  const handleToggleFilter = () => setToggleFilter((prev) => !prev);

  const isSortBy = searchParams.get("sortby") && searchParams.get("orderby");
  const isFilter =
    searchParams.has("value") && searchParams.get("value") !== "";

  return (
    <div className="relative mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
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

      <p className="text-right">
        <em className="opacity-50">
          Exibindo {filtedTableLength} de {tableLength} Resultados
        </em>
      </p>
    </div>
  );
}
