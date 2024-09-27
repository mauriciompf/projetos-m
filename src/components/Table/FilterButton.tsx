import { useRef } from "react";
import useFilterAndSortStatus from "../../customHooks/useFilterAndSortStatus";
import Button from "../Button";
import { useThemeContext } from "../../context/ThemeContext";
import { downIcon } from "../../utils/icons";
import FilterBox from "./FilterBox";
import { useTableToggleContext } from "../../context/TableToggleContext";

export default function FilterButton() {
  const { theme } = useThemeContext();
  const { isFilter } = useFilterAndSortStatus();
  const { toggleFilter, toggleSortBy, setToggleFilter } =
    useTableToggleContext();

  const refWrapFilter = useRef<HTMLDivElement | null>(null);
  const refFilterBtn = useRef<HTMLButtonElement | null>(null);

  return (
    <div ref={refWrapFilter} className="relative">
      <Button
        refBtn={refFilterBtn}
        onClick={() => setToggleFilter(!toggleFilter)}
        className={`${theme === "dark" ? "border-transparent bg-jet" : "border-jet"} relative select-none rounded-md border px-2 py-2 font-bold shadow-sm transition-opacity`}
      >
        {isFilter && (
          <span
            className={`${toggleSortBy && "animate-pulse"} absolute -right-0 -top-0 z-50 size-3 rounded-full bg-green-400`}
          ></span>
        )}
        <strong>
          <span className="max-[420px]:hidden">🔍</span> Filtro {downIcon}
        </strong>
      </Button>

      {toggleFilter && (
        <FilterBox
          refFilterBtn={refFilterBtn}
          setToggleFilter={setToggleFilter}
        />
      )}
    </div>
  );
}
