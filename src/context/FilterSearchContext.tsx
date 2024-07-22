import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";

const FilterSearchContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: (val: any) => void;
  statusParams: URLSearchParams;
  setStatusParams: (val: any) => void;
} | null>(null);

function FilterSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusParams, setStatusParams] = useSearchParams();

  return (
    <FilterSearchContext.Provider
      value={{ searchParams, setSearchParams, statusParams, setStatusParams }}
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
