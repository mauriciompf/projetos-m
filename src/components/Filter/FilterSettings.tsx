import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import SortByBox from "./sortBy/SortByBox";
import useThemeContext from "../../customHooks/useThemeContext";
import FilterSettingsBox from "./filter/FilterSettingsBox";

type FilterSettingsProps = {
  orderBy: string;
  setOrderBy: (val: string) => void;
  selectColumn: string;
  setSelectColumn: (val: string) => void;
  setToggleSortBy?: (val: boolean) => void;
};

export default function FilterSettings({
  orderBy,
  selectColumn,
  setOrderBy,
  setSelectColumn,
}: FilterSettingsProps) {
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
        ORGANIZAR
      </Button>

      <Button
        onClick={handleToggleFilter}
        className={`rounded-md ${theme === "dark" ? "bg-black" : "bg-slate-300"} px-4 py-2 font-bold`}
      >
        FILTRO
      </Button>

      <span>Show x/y</span>

      {toggleSortBy &&
        createPortal(
          <SortByBox
            orderBy={orderBy}
            selectColumn={selectColumn}
            refSortByBtn={refSortByBtn}
            setOrderBy={setOrderBy}
            setSelectColumn={setSelectColumn}
            setToggleSortBy={setToggleSortBy}
          />,
          document.body,
        )}

      {toggleFilter && createPortal(<FilterSettingsBox />, document.body)}
    </div>
  );
}
