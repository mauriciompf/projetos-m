import { createContext, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";

// #FIXME type any
const ToggleContext = createContext<any | null>(null);

// #FIXME type any
function ToggleContextProvider({ children }: any) {
  const [orderBy, setOrderBy] = useState("");
  const [selectColumn, setSelectColumn] = useState("");

  return (
    <ToggleContext.Provider
      value={{
        orderBy,
        setOrderBy,
        selectColumn,
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
