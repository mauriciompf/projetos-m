import { useTableContext } from "../context/TableContext";

const useFilterAndSortStatus = () => {
  const { searchParams } = useTableContext();

  const isSortBy = searchParams.get("sortby") && searchParams.get("orderby");
  const isFilter =
    searchParams.has("value") && searchParams.get("value") !== "";

  return {
    isSortBy,
    isFilter,
  };
};

export default useFilterAndSortStatus;
