import { useState } from "react";
import { useTableContext } from "../context/TableContext";

const useSortByHandlers = () => {
  const [orderByToggle, setOrderByToggle] = useState(false);
  const { orderByParams, setOrderByParams } = useTableContext();

  const handleSelectOrderBy = (label: string) => {
    setOrderByToggle(false); // Close orderBy dropdown when an option is clicked
    orderByParams.set("orderby", label.toLowerCase()); // Set orderBy param
    setOrderByParams(orderByParams);
  };

  return {
    orderByToggle,
    setOrderByToggle,
    handleSelectOrderBy,
  };
};

export default useSortByHandlers;
