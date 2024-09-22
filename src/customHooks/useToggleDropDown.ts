import { useState } from "react";
import tableHeaders from "../utils/tableHeaders";
import { useTableParamsContext } from "../context/TableParamsContext";

const useToggleDropDown = (key: string) => {
  const { setSelectColumn, selectColumnMap, searchParams, setSearchParams } =
    useTableParamsContext();
  const [selectColumnToggle, setSelectColumnToggle] = useState(false);
  const orderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const handleSelectColumnToggle = () => setSelectColumnToggle((prev) => !prev);

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

  const handleSelectColumn = (header: string) =>
    setSelectColumn(key, header.toLowerCase()); // Set column value in params

  return {
    selectColumnToggle,
    handleSelectColumnToggle,
    removeSelectedColumn,
    handleSelectColumn,
    selectColumn: selectColumnMap[key], // Return the currently selected column value for the given key
  };
};

export default useToggleDropDown;
