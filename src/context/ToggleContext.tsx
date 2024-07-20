import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";

// #FIXME type any
const ToggleContext = createContext<any | null>(null);

function ToggleContextProvider({ children }: { children: React.ReactNode }) {
  const [orderBy, setOrderBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const setSelectColumn = (key: string, column: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, column);
    setSearchParams(newSearchParams);
  };

  // Convert searchParams to an object
  const selectColumnMap = Object.fromEntries(searchParams.entries());

  return (
    <ToggleContext.Provider
      value={{
        orderBy,
        setOrderBy,
        setSelectColumnMap: setSearchParams,
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
