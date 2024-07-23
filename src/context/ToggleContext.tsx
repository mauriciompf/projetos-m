import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";

type ToggleContextValues = {
  orderByParams: URLSearchParams;
  setOrderByParams: (params: URLSearchParams) => void;
  setSelectColumnMap: () => void;
  selectColumnMap: { [key: string]: string };
  setSelectColumn: (key: string, column: string) => void;
};

// #FIXME Type any
const ToggleContext = createContext<ToggleContextValues | null>(null);

function ToggleContextProvider({ children }: { children: React.ReactNode }) {
  const [orderByParams, setOrderByParams] = useSearchParams();
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
        orderByParams,
        setOrderByParams,
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
