import { createContext, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import { TableToggleValues } from "../utils/types";

const TableToggleContext = createContext<TableToggleValues | null>(null);

export default function TableToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);

  return (
    <TableToggleContext.Provider
      value={{
        toggleSortBy,
        setToggleSortBy,
        toggleFilter,
        setToggleFilter,
      }}
    >
      {children}
    </TableToggleContext.Provider>
  );
}

export const useTableToggleContext = () =>
  useCustomHookContext(
    TableToggleContext,
    "useuseTableToggleContext",
    "useTableToggleContextProvider",
  );
