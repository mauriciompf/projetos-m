import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useCustomHookContext from "../customHooks/useCustomHookContext";

const filterSearchContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: (val: any) => void;
} | null>(null);

function FilterSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <filterSearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </filterSearchContext.Provider>
  );
}

const useFilterSearchContext = () =>
  useCustomHookContext(
    filterSearchContext,
    "useFilterSearchContext",
    "FilterSearchProvider",
  );

export { FilterSearchProvider, useFilterSearchContext };
