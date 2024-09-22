import { useTableParamsContext } from "../context/TableParamsContext";

const useFilterAndSortStatus = () => {
  const { searchParams } = useTableParamsContext();

  const isSortBy = searchParams.get("sortby") && searchParams.get("orderby");
  const isFilter =
    searchParams.has("value") && searchParams.get("value") !== "";

  return {
    isSortBy,
    isFilter,
  };
};

export default useFilterAndSortStatus;
