import { useMemo, useEffect } from "react";
import useSortBy from "./useSortBy";
import useToggleDropDown from "./useToggleDropDown";
import { useTableContext } from "../context/TableContext";
import { UserData } from "../utils/types";
import getSexNameTranslated from "../utils/getSexNameTranslated";

const useFilter = () => {
  const { searchParams, setStatusParams, statusParams } = useTableContext();
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { sortedUserData } = useSortBy();

  useEffect(() => {
    if (selectColumnFilter === "sexo") {
      // Only setStatusParams here, outside of the memoization process
      statusParams.delete("status");
      setStatusParams(statusParams);
    }
  }, [selectColumnFilter, statusParams, setStatusParams]);

  const filteredAndSortedUserData = useMemo(() => {
    const inputSearch = searchParams.get("value")?.trim();
    const statusLabel = statusParams.get("status");
    const isNumber = /^[0-9]+$/;

    const filterUsers = (callback: (userData: UserData) => boolean) =>
      sortedUserData.filter(callback);

    const getSearchCondition = () => {
      if ((!statusLabel && inputSearch === "Masculino") || !inputSearch) {
        return;
      }

      switch (selectColumnFilter) {
        case "id":
          if (!isNumber.test(inputSearch)) return;
          return (user: UserData) => user.id === Number(inputSearch);
        case "nome":
          return (user: UserData) =>
            user.firstName.toLowerCase().startsWith(inputSearch.toLowerCase());
        case "idade":
          if (!isNumber.test(inputSearch)) return;
          return (user: UserData) => user.age === Number(inputSearch);
        case "sexo":
          return (user: UserData) =>
            getSexNameTranslated(user.gender).toLowerCase() === inputSearch;
        case "email":
          return (user: UserData) =>
            user.email.toLowerCase().startsWith(inputSearch.toLowerCase());
        case "telefone":
          return (user: UserData) =>
            user.phone.substring(1).startsWith(inputSearch);
        default:
          return;
      }
    };

    const searchCondition = getSearchCondition();

    if (!searchCondition) {
      return sortedUserData;
    }

    return filterUsers(
      statusLabel === "é" || statusLabel !== "não é"
        ? searchCondition
        : (user) => !searchCondition(user),
    );
  }, [sortedUserData, searchParams, statusParams, selectColumnFilter]);

  return { filteredAndSortedUserData };
};

export default useFilter;
