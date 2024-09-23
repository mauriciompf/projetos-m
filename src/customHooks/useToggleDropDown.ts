import { useState } from "react";
import { tableHeaders } from "../utils/constants";
import { useTableContext } from "../context/TableContext";

const useToggleDropDown = (key: string) => {
  const [selectColumnToggle, setSelectColumnToggle] = useState(false);

  const { setSelectColumn, selectColumnMap, searchParams, setSearchParams } =
    useTableContext();

  const orderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const handleSelectColumn = (header: string) =>
    setSelectColumn(key, header.toLowerCase()); // Set column value in params

  const removeSelectedColumn = (column: string) => {
    // Check if the selected column value is included in tableHeaders or orderByLabels
    if (
      tableHeaders.toString().toLowerCase().includes(column) ||
      orderByLabels.toString().toLowerCase().includes(column)
    ) {
      setSelectColumn(key, ""); // Remove selected column value from params
      searchParams.delete(key);
      setSearchParams(new URLSearchParams(searchParams));
    }
  };

  return {
    selectColumnToggle,
    setSelectColumnToggle,
    removeSelectedColumn,
    handleSelectColumn,
    selectColumn: selectColumnMap[key], // Return the currently selected column value for the given key
  };
};

export default useToggleDropDown;
