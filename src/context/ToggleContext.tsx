import { createContext, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";

// #FIXME type any
const ToggleContext = createContext<any | null>(null);

function ToggleContextProvider({ children }: { children: React.ReactNode }) {
  const [orderBy, setOrderBy] = useState("");
  const [selectColumnMap, setSelectColumnMap] = useState({});
  // const [selectColumn, setSelectColumn] = useState("");

  const setSelectColumn = (key: string, column: string) => {
    setSelectColumnMap((prev) => ({
      ...prev,
      [key]: column,
    }));
  };

  return (
    <ToggleContext.Provider
      value={{
        orderBy,
        setOrderBy,
        setSelectColumnMap,
        selectColumnMap,
        setSelectColumn,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

const useToggleContext = () =>
  useCustomHookContext(
    ToggleContext,
    "useToggleContext",
    "ToggleContextProvider",
  );

export { ToggleContextProvider, useToggleContext };
