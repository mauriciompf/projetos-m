import { useState } from "react";
import { tableHeaders } from "../components/Filter/FilterTable";
import { useToggleContext } from "../context/ToggleContext";

const useToggleDropDown = (key: string) => {
  const { setSelectColumn, selectColumnMap, setOrderByParams, orderByParams } =
    useToggleContext();
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const orderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const removeSelectedColumn = (col: string) => {
    // Determine if col selected in dropdown is includes in tableHeaders array
    if (
      tableHeaders.toString().toLowerCase().includes(col) ||
      orderByLabels.toString().toLowerCase().includes(col)
    ) {
      setSelectColumn(key, "");
    }
  };

  const handleToggleSelectColumn = () =>
    setToggleSelectColumn(!toggleSelectColumn);

  const handleSelectColumn = (header: string) =>
    setSelectColumn(key, header.toLowerCase());

  const handleToggleOrderBy = () => setToggleOrderBy(!toggleOrderBy);

  const handleSelectOrderBy = (label: string) => {
    orderByParams.set("orderby", label.toLowerCase());
    setOrderByParams(orderByParams);
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
