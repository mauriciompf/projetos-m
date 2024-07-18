import { useState } from "react";
import { tableHeaders } from "../components/Filter/FilterTable";
import { useToggleContext } from "../context/ToggleContext";

const useToggleDropDown = (key: string) => {
  const { setSelectColumn, selectColumnMap, setOrderBy } = useToggleContext();
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const removeSelectedColumn = (col: string) => {
    // Determine if col selected in dropdown is includes in tableHeaders array
    if (tableHeaders.includes(col) || OrderByLabels.includes(col)) {
      setSelectColumn(key, "");
    }
  };

  const handleToggleSelectColumn = () =>
    setToggleSelectColumn(!toggleSelectColumn);

  const handleSelectColumn = (header: string) => setSelectColumn(key, header);

  const handleToggleOrderBy = () => setToggleOrderBy(!toggleOrderBy);

  const handleSelectOrderBy = (label: string) => {
    setOrderBy(label);
    setToggleOrderBy(false);
  };

  return {
    removeSelectedColumn,
    handleToggleSelectColumn,
    handleSelectColumn,
    handleToggleOrderBy,
    handleSelectOrderBy,
    toggleSelectColumn,
    toggleOrderBy,
    selectColumn: selectColumnMap[key],
  };
};

export default useToggleDropDown;
