import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import { tableHeaders } from "./FilterTable";

export default function FilterSettings({
  orderBy,
  setOrderBy,
  selectColumn,
  setSelectColumn,
}) {
  const [toggleSortBy, setToggleSortBy] = useState(false);

  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);

  const handleToggleSortBy = () => {
    setToggleSortBy(!toggleSortBy);
  };

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

  const removeSelectedColumn = (col: string) => {
    tableHeaders.forEach((column) => {
      if (col === column) setSelectColumn("");
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

  const OrderByLabels = ["ASC", "DESC", "Padrão"];

  return (
    <div className="relative mx-auto mb-6 flex w-[80%] items-center gap-4">
      <Button
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
          <article className="fixed left-[290px] top-[180px] flex items-start gap-2 rounded-md bg-slate-300 p-4">
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
                  {tableHeaders.map((header) => (
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
          </article>,
          document.body,
        )}
    </div>
  );
}
