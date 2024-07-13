import { tableHeaders } from "../FilterTable";
import { useEffect, useRef, useState, useCallback } from "react";
import Button from "../../Button";
import useThemeContext from "../../../customHooks/useThemeContext";
import WrapSettingsBox from "../../WrapSettingsBox";

type SortByBoxProps = {
  orderBy: string;
  selectColumn: string;
  setOrderBy: (val: string) => void;
  refSortByBtn: any;
  setSelectColumn: (val: string) => void;
  setToggleSortBy?: (val: boolean) => void;
};

export default function SortByBox({
  orderBy,
  selectColumn,
  refSortByBtn,
  setOrderBy,
  setSelectColumn,
  setToggleSortBy,
}: SortByBoxProps) {
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const refSortByBox = useRef<HTMLElement | null>(null);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  const { theme } = useThemeContext();

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      refSortByBox.current &&
      !refSortByBox.current.contains(target) &&
      target !== refSortByBtn.current
    ) {
      setToggleSortBy!(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const removeSelectedColumn = (col: string) => {
    tableHeaders.forEach((header) => {
      if (col === header) setSelectColumn("");
    });

    OrderByLabels.forEach((label) => {
      if (col === label) setOrderBy("");
    });
  };

  function SelectedSortBy({ col }: { col: string }) {
    return (
      <div
        className={`${theme === "dark" ? "border-white" : "border-black"} flex items-center gap-2 border border-black p-2`}
      >
        <span className="font-bold">{col}</span>
        <Button
          onClick={() => removeSelectedColumn(col)}
          className="rounded-full bg-red-500 px-2 py-0 ring-transparent hover:bg-red-300 focus:bg-red-300"
        >
          x
        </Button>
      </div>
    );
  }

  const handleToggleSelectColumn = () => {
    setToggleSelectColumn(!toggleSelectColumn);
  };

  const handleSelectColumn = (header: string) => {
    setSelectColumn(header);
  };

  const handleToggleOrderBy = () => {
    setToggleOrderBy(!toggleOrderBy);
  };

  const handleOrderBy = (label: string) => {
    setOrderBy(label);
    setToggleOrderBy(false);
  };

  return (
    <WrapSettingsBox refElem={refSortByBox}>
      <div>
        {selectColumn ? (
          <SelectedSortBy col={selectColumn} />
        ) : (
          <Button
            onClick={handleToggleSelectColumn}
            className={`${theme === "dark" ? "border-white" : "border-black"} border p-2`}
          >
            Selecione uma coluna
          </Button>
        )}
        {!selectColumn && toggleSelectColumn && (
          <ul>
            {tableHeaders
              .filter(
                (header) =>
                  header !== "Sexo" &&
                  header !== "Email" &&
                  header !== "Telefone",
              )
              .map((header) => (
                <li
                  className={`${theme === "dark" ? "border-white" : "border-black"} border`}
                  key={header}
                >
                  <Button
                    onClick={() => handleSelectColumn(header)}
                    className={`${theme !== "dark" && "hover:bg-black hover:text-white focus:bg-black focus:text-white"} w-full p-2 text-left hover:bg-white hover:text-black focus:bg-white focus:text-black`}
                  >
                    {header}
                  </Button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div>
        {orderBy ? (
          <Button
            onClick={handleToggleOrderBy}
            className={`flex w-full items-center gap-2 border border-black p-2 ${theme === "dark" ? "border-white" : "border-black"} `}
          >
            <span className="font-bold">{orderBy}</span>
          </Button>
        ) : (
          <Button
            onClick={handleToggleOrderBy}
            className={`${theme === "dark" ? "border-white" : "border-black"} border p-2`}
          >
            Ordernar por
          </Button>
        )}

        {toggleOrderBy && (
          <ul>
            {OrderByLabels.map((label) => (
              <li
                className={`${theme === "dark" ? "border-white" : "border-black"} border`}
                key={label}
              >
                <Button
                  onClick={() => handleOrderBy(label)}
                  className={`${theme !== "dark" && "hover:bg-black hover:text-white focus:bg-black focus:text-white"} w-full p-2 text-left hover:bg-white hover:text-black focus:bg-white focus:text-black`}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </WrapSettingsBox>
  );
}
