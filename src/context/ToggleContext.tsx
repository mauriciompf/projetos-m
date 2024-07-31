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

const ToggleContext = createContext<ToggleContextValues | null>(null);

function ToggleContextProvider({ children }: { children: React.ReactNode }) {
  const [orderByParams, setOrderByParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const setSelectColumn = (key: string, column: string) => {
    const newSearchParams = new URLSearchParams(searchParams); // Get a new URLSearchParams instance with the current params
    newSearchParams.set(key, column); // Set the column value for the given key
    setSearchParams(newSearchParams);
  };

  const selectColumnMap = Object.fromEntries(searchParams.entries()); // Convert searchParams to an object

  return (
    <ToggleContext.Provider
      value={{
        orderByParams,
        setOrderByParams,
        setSelectColumnMap: setSearchParams, // Set the search params directly as the select column map
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
