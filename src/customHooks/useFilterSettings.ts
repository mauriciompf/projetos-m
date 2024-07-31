import { useState } from "react";
import { useFilterSearchContext } from "../context/FilterSearchContext";

const useFilterSettings = () => {
  const [toggleSortBy, setToggleSortBy] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const { searchParams } = useFilterSearchContext();
  const handleToggleSortBy = () => setToggleSortBy((prev) => !prev);
  const handleToggleFilter = () => setToggleFilter((prev) => !prev);
  const isSortBy = searchParams.get("sortby") && searchParams.get("orderby");
  const isFilter =
    searchParams.has("value") && searchParams.get("value") !== "";

  return {
    toggleFilter,
    toggleSortBy,
    handleToggleSortBy,
    handleToggleFilter,
    isSortBy,
    isFilter,
    setToggleSortBy,
    setToggleFilter,
  };
};

export default useFilterSettings;
