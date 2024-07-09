import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import { tableHeaders } from "./FilterTable";

export default function FilterSettings() {
  const [toggleSortBy, setToggleBy] = useState(false);
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);

  const handleSortBy = () => {
    setToggleBy(!toggleSortBy);
  };

  const handleSelectColumn = () => {
    setToggleSelectColumn(!toggleSelectColumn);
  };

  return (
    <div className="mx-auto mb-6 flex w-[80%] items-center gap-4">
      <Button
        onClick={handleSortBy}
        className="rounded-md bg-slate-300 px-4 py-2 font-bold"
      >
        SORT BY
      </Button>

      <Button className="rounded-md bg-slate-300 px-4 py-2 font-bold">
        FILTER
      </Button>

      <span>Show x/y</span>

      {toggleSortBy &&
        createPortal(
          <article className="left-[290px] top-[180px] flex items-start gap-2 rounded-md bg-slate-300 p-4">
            <div>
              <Button
                onClick={handleSelectColumn}
                className="border border-black p-2"
              >
                Select Column
              </Button>
              {toggleSelectColumn && (
                <ul>
                  {tableHeaders.map((header) => (
                    <li className="border border-black" key={header}>
                      <Button className="w-full text-left hover:bg-black hover:text-white focus:bg-black focus:text-white">
                        {header}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button className="border border-black p-2">Order By</Button>
          </article>,
          document.body,
        )}
    </div>
  );
}
