import { useEffect } from "react";
import useSortBy from "./useSortBy";
import useToggleDropDown from "./useToggleDropDown";
import { useTableContext } from "../context/TableContext";
import { UserData } from "../utils/types";
import getSearchCondition from "../utils/getSearchCondition";

const useFilter = () => {
  const { setStatusParams, statusParams, searchParams } = useTableContext();
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { sortedUserData } = useSortBy();

  useEffect(() => {
    if (selectColumnFilter === "sexo") {
      statusParams.delete("status");
      setStatusParams(statusParams);
    }
  }, [selectColumnFilter, statusParams, setStatusParams]);

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

  return { filteredUserData };
};

export default useFilter;
