import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import { TableParamsValues } from "../utils/types";

const TableParamsContext = createContext<TableParamsValues | null>(null);

export default function TableParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusParams, setStatusParams] = useSearchParams();
  const [orderByParams, setOrderByParams] = useSearchParams();
  const [filtedTableLength, setFiltedTableLength] = useState(0);

  const setSelectColumn = (key: string, column: string) => {
    const newSearchParams = new URLSearchParams(searchParams); // Get a new URLSearchParams instance with the current params
    newSearchParams.set(key, column); // Set the column value for the given key
    setSearchParams(newSearchParams);
  };

  const selectColumnMap = Object.fromEntries(searchParams.entries()); // Convert searchParams to an object

  return (
    <TableParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        statusParams,
        setStatusParams,
        filtedTableLength,
        setFiltedTableLength,
        orderByParams,
        setOrderByParams,
        setSelectColumnMap: setSearchParams, // Set the search params directly as the select column map
        selectColumnMap,
        setSelectColumn,
      }}
    >
      {children}
    </TableParamsContext.Provider>
  );
}

export const useTableParamsContext = () =>
  useCustomHookContext(
    TableParamsContext,
    "useTableParamsContext",
    "TableParamsProvider",
  );
