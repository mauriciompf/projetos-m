import { useState } from "react";
import { useTableParamsContext } from "../context/TableParamsContext";

const useSortByHandlers = () => {
  const [orderByToggle, setOrderByToggle] = useState(false);
  const { orderByParams, setOrderByParams } = useTableParamsContext();

  const handleOrderByToggle = () => setOrderByToggle((prev) => !prev);
  const handleSelectOrderBy = (label: string) => {
    setOrderByToggle(false); // Close orderBy dropdown when an option is clicked
    orderByParams.set("orderby", label.toLowerCase()); // Set orderBy param
    setOrderByParams(orderByParams);
  };

  return {
    orderByToggle,
    handleOrderByToggle,
    handleSelectOrderBy,
  };
};

export default useSortByHandlers;
