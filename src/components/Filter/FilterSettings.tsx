import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import { tableHeaders } from "./FilterTable";

type FilterSettingsProps = {
  orderBy: string;
  setOrderBy: (val: string) => void;
  selectColumn: string;
  setSelectColumn: (val: string) => void;
  setToggleSortBy?: (val: boolean) => void;
};

export default function FilterSettings({
  orderBy,
  setOrderBy,
  selectColumn,
  setSelectColumn,
}: FilterSettingsProps) {
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const refSortByBtn = useRef<HTMLButtonElement | null>(null);

  const handleToggleSortBy = () => {
    setToggleSortBy((prev) => !prev);
  };

  return (
    <div className="relative mx-auto mb-6 flex w-[80%] items-center gap-4">
      <Button
        refBtn={refSortByBtn}
        onClick={handleToggleSortBy}
        className="rounded-md bg-slate-300 px-4 py-2 font-bold"
      >
        ORGANIZAR
      </Button>

      <Button className="rounded-md bg-slate-300 px-4 py-2 font-bold">
        FILTRO
      </Button>

      <span>Show x/y</span>

      {toggleSortBy &&
        createPortal(
          <SortByBox
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            selectColumn={selectColumn}
            setSelectColumn={setSelectColumn}
            setToggleSortBy={setToggleSortBy}
          />,
          document.body,
        )}
    </div>
  );
}

function SortByBox({
  orderBy,
  setOrderBy,
  selectColumn,
  setSelectColumn,
  setToggleSortBy,
}: FilterSettingsProps) {
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const refSortByBox = useRef<HTMLElement | null>(null);

  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  const handleClickOutside = useCallback((e: MouseEvent) => {
    const refSortByBox = useRef<HTMLDivElement | null>(null);

    const target = e.target as HTMLElement;

    if (refSortByBox.current && !refSortByBox.current.contains(target)) {
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
      <div className="flex items-center gap-2 border border-black p-2">
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
    <article
      ref={refSortByBox}
      className="fixed left-[290px] top-[180px] flex items-start gap-2 rounded-md bg-slate-300 p-4"
    >
      <div>
        {selectColumn ? (
          <SelectedSortBy col={selectColumn} />
        ) : (
          <Button
            onClick={handleToggleSelectColumn}
            className="border border-black p-2"
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
                <li className="border border-black" key={header}>
                  <Button
                    onClick={() => handleSelectColumn(header)}
                    className="w-full p-2 text-left hover:bg-black hover:text-white focus:bg-black focus:text-white"
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
            className="flex w-full items-center gap-2 border border-black p-2"
          >
            <span className="font-bold">{orderBy}</span>
          </Button>
        ) : (
          <Button
            onClick={handleToggleOrderBy}
            className="border border-black p-2"
          >
            Ordernar por
          </Button>
        )}

        {toggleOrderBy && (
          <ul>
            {OrderByLabels.map((label) => (
              <li className="border border-black" key={label}>
                <Button
                  onClick={() => handleOrderBy(label)}
                  className="w-full p-2 text-left hover:bg-black hover:text-white focus:bg-black focus:text-white"
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
