import { useRef } from "react";
import Button from "../Button";
import useFilterAndSortStatus from "../../customHooks/useFilterAndSortStatus";
import SortByBox from "./SortByBox";
import { downIcon } from "../../utils/icons";
import { useThemeContext } from "../../context/ThemeContext";
import { useTableToggleContext } from "../../context/TableToggleContext";

export default function SortByButton() {
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);
  const refWrapSortBy = useRef<HTMLDivElement | null>(null);

  const { isSortBy } = useFilterAndSortStatus();
  const { toggleSortBy, setToggleSortBy } = useTableToggleContext();
  const { theme } = useThemeContext();

  return (
    <div ref={refWrapSortBy} className="relative">
      <Button
        refBtn={refSortByBtn}
        onClick={() => setToggleSortBy(!toggleSortBy)}
        className={`${theme === "dark" ? "border-transparent bg-[#25282A]" : "border-gray-300"} relative select-none rounded-3xl border px-2 py-2 font-black`}
      >
        {isSortBy && (
          <span
            className={`${toggleSortBy && "animate-pulse"} absolute -right-0 -top-0 z-50 size-3 rounded-full bg-green-400`}
          ></span>
        )}
        <span className="max-[420px]:hidden">{toggleSortBy ? "📂" : "📁"}</span>{" "}
        Ordernar {downIcon}
      </Button>

      {toggleSortBy && <SortByBox refSortByBtn={refSortByBtn} />}
    </div>
  );
}
