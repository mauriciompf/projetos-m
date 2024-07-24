import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";

const FilterSearchContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: (val: any) => void;
  statusParams: URLSearchParams;
  setStatusParams: (val: any) => void;
  filtedTableLength: number;
  setFiltedTableLength: Dispatch<SetStateAction<number>>;
} | null>(null);

function FilterSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusParams, setStatusParams] = useSearchParams();
  const [filtedTableLength, setFiltedTableLength] = useState(0);

  return (
    <FilterSearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        statusParams,
        setStatusParams,
        filtedTableLength,
        setFiltedTableLength,
      }}
    >
      {children}
    </FilterSearchContext.Provider>
  );
}

const useFilterSearchContext = () =>
  useCustomHookContext(
    FilterSearchContext,
    "useFilterSearchContext",
    "FilterSearchProvider",
  );

export { FilterSearchProvider, useFilterSearchContext };
