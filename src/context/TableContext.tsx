import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import { TableParamsValues } from "../utils/types";
import { tableLength } from "../utils/constants";
import useFetch from "../customHooks/useFetch";

const TableContext = createContext<TableParamsValues | null>(null);

export default function TableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusParams, setStatusParams] = useSearchParams();
  const [orderByParams, setOrderByParams] = useSearchParams();
  const [filtedTableLength, setFiltedTableLength] = useState(0);
  const {
    data: userData,
    isLoading,
    isError,
  } = useFetch(
    `https://dummyjson.com/users?limit=${tableLength}`,
    "users",
    "users",
  );

  if (isError) {
    console.error(isError);
    return;
  }

  const setSelectColumn = (key: string, column: string) => {
    const newSearchParams = new URLSearchParams(searchParams); // Get a new URLSearchParams instance with the current params
    newSearchParams.set(key, column); // Set the column value for the given key
    setSearchParams(newSearchParams);
  };

  const selectColumnMap = Object.fromEntries(searchParams.entries()); // Convert searchParams to an object

  return (
    <TableContext.Provider
      value={{
        userData,
        isLoading,
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
    </TableContext.Provider>
  );
}

export const useTableContext = () =>
  useCustomHookContext(TableContext, "TableContext", "TableProvider");
