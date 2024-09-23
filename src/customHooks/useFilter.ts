import { useEffect } from "react";
import useSortBy from "./useSortBy";
import useToggleDropDown from "./useToggleDropDown";
import { useTableContext } from "../context/TableContext";
import { UserData } from "../utils/types";
import getSearchCondition from "../utils/getSearchCondition";
import { highlightText } from "../utils/highlightText";

const useFilter = () => {
  const { setStatusParams, statusParams, searchParams, setFiltedTableLength } =
    useTableContext();
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { sortedUserData } = useSortBy();

  const highLightMatch = (columnName: string, dataValue: string | number) => {
    const searchTerm = searchParams.get("value") || "";

    if (statusParams.get("status") === "não é") return dataValue;
    if (selectColumnFilter === columnName)
      return highlightText(dataValue.toString(), searchTerm);

    return dataValue;
  };

  const filteredUserData = () => {
    const statusLabel = statusParams.get("status");

    const filterUsers = (callback: (userData: UserData) => boolean) =>
      sortedUserData.filter(callback);

    const searchCondition = getSearchCondition(
      selectColumnFilter,
      searchParams,
      statusParams,
    );
    if (!searchCondition) return sortedUserData;

    return filterUsers(
      statusLabel === "é" || statusLabel !== "não é"
        ? searchCondition
        : (user) => !searchCondition(user),
    );
  };

  // Remove status param if sex is selected in filter box
  useEffect(() => {
    if (selectColumnFilter === "sexo") {
      statusParams.delete("status");
      setStatusParams(statusParams);
    }
  }, [selectColumnFilter, statusParams, setStatusParams]);

  // Set the table length filtered
  useEffect(() => {
    setFiltedTableLength(filteredUserData().length);
  }, [filteredUserData, setFiltedTableLength]);

  return { filteredUserData, highLightMatch };
};

export default useFilter;
