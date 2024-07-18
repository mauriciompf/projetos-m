import { useState } from "react";
import { tableHeaders } from "../components/Filter/FilterTable";
import { useToggleContext } from "../context/ToggleContext";

const useToggleDropDown = () => {
  const { setSelectColumn, setOrderBy } = useToggleContext();
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const removeSelectedColumn = (col: string) => {
    // Determine if col selected in dropdown is includes in tableHeaders array
    if (tableHeaders.includes(col)) {
      setSelectColumn("");
    }

    if (OrderByLabels.includes(col)) {
      setSelectColumn("");
    }
  };

  const handleToggleSelectColumn = () =>
    setToggleSelectColumn(!toggleSelectColumn);
  const handleSelectColumn = (header: string) => setSelectColumn(header);
  const handleToggleOrderBy = () => setToggleOrderBy(!toggleOrderBy);
  const handleOrderBy = (label: string) => {
    setOrderBy(label);
    setToggleOrderBy(false);
  };

  return {
    removeSelectedColumn,
    handleToggleSelectColumn,
    handleSelectColumn,
    handleToggleOrderBy,
    handleOrderBy,
    toggleSelectColumn,
    toggleOrderBy,
  };
};

export default useToggleDropDown;
