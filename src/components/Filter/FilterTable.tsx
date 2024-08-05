import { useEffect, useMemo } from "react";
import { useFilterSearchContext } from "../../context/FilterSearchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useToggleContext } from "../../context/ToggleContext";
import useToggleDropDown from "../../customHooks/useToggleDropDown";
import tableHeaders from "../../utils/tableHeaders";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import UserRow from "./UserRow";

export type UsersData = {
  id: number;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
};

type FilterTableProps = {
  usersData: UsersData[];
};

export default function FilterTable({ usersData }: FilterTableProps) {
  const { orderByParams } = useToggleContext();
  const { selectColumn: selectColumnSortBy } = useToggleDropDown("sortby");
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { theme } = useThemeContext();
  const {
    searchParams,
    setStatusParams,
    statusParams,
    setFiltedTableLength,
    filtedTableLength,
  } = useFilterSearchContext();

  // # TODO Simplify code
  const sortedUserData = useMemo(() => {
    const usersDataCopy = [...usersData];
    const descOrder = orderByParams.get("orderby") === "decrescente";
    const ascOrder = orderByParams.get("orderby") === "crescente";
    switch (selectColumnSortBy) {
      case "id":
        if (descOrder) {
          return usersDataCopy.sort((a, b) => b.id - a.id);
        }
        break;
      case "nome":
        if (ascOrder) {
          return usersDataCopy.sort((a, b) =>
            a.firstName.localeCompare(b.firstName),
          );
        } else if (descOrder) {
          return usersDataCopy.sort((a, b) =>
            b.firstName.localeCompare(a.firstName),
          );
        }
        break;
      case "idade":
        if (ascOrder) {
          return usersDataCopy.sort((a, b) => a.age - b.age);
        } else if (descOrder) {
          return usersDataCopy.sort((a, b) => b.age - a.age);
        }
        break;
      case "data de nasc.":
        if (ascOrder) {
          return usersDataCopy.sort((a, b) =>
            a.birthDate.localeCompare(b.birthDate),
          );
        } else if (descOrder) {
          return usersDataCopy.sort((a, b) =>
            b.birthDate.localeCompare(a.birthDate),
          );
        }
    }

    return usersDataCopy;
  }, [usersData, orderByParams, selectColumnSortBy]);

  // # TODO Simplify code
  const filteredAndSortedUserData = useMemo(() => {
    const inputSearch = searchParams.get("value")?.trim();
    const statusLabel = statusParams.get("status");
    const isNumber = /^[0-9]+$/;
    const filterUsers = (callback: (user: UsersData) => boolean) =>
      sortedUserData.filter(callback);

    const getSearchCondition = () => {
      if ((!statusLabel && inputSearch === "Masculino") || !inputSearch) {
        return;
      }

      switch (selectColumnFilter) {
        case "id":
          if (!isNumber.test(inputSearch)) return;
          return (user: UsersData) => user.id === Number(inputSearch);
        case "nome":
          return (user: UsersData) =>
            user.firstName.toLowerCase().startsWith(inputSearch.toLowerCase());
        case "idade":
          if (!isNumber.test(inputSearch)) return;
          return (user: UsersData) => user.age === Number(inputSearch);
        case "sexo":
          return (user: UsersData) =>
            getSexNameTranslated(user.gender).toLowerCase() === inputSearch;
        case "email":
          return (user: UsersData) =>
            user.email.toLowerCase().startsWith(inputSearch.toLowerCase());
        case "telefone":
          return (user: UsersData) =>
            user.phone.substring(1).startsWith(inputSearch);
        default:
          console.error("Default case");
          return;
      }
    };
    const searchCondition = getSearchCondition();

    if (selectColumnFilter === "sexo") {
      statusParams.delete("status");
      setStatusParams(statusParams);
    }

    if (!searchCondition) {
      return sortedUserData;
    }

    return filterUsers(
      statusLabel === "é" || statusLabel !== "não é"
        ? searchCondition
        : (user) => !searchCondition(user),
    );
  }, [sortedUserData, searchParams, statusParams, selectColumnFilter]);

  // Update the length of the filtered table data whenever it changes
  useEffect(() => {
    setFiltedTableLength(filteredAndSortedUserData.length);

    if (filteredAndSortedUserData.length === 0) {
    }
  }, [filteredAndSortedUserData.length]);

  return (
    <>
      <div className="mx-6 overflow-auto max-md:max-h-[350px] min-[1200px]:mx-0">
        <table className="w-full whitespace-nowrap">
          {/* // sticky top-[4.75rem] z-0 */}
          <thead className="sticky top-0 z-0">
            <tr
              className={`${theme === "dark" ? "bg-slate-700 text-gray-100" : "bg-[#282A2D] text-gray-100"} `}
            >
              {tableHeaders.map((header) => {
                return (
                  <th className={`p-2`} key={header}>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUserData.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
      {filtedTableLength === 0 && (
        <div className="mt-10 grid select-none place-items-center gap-4 text-2xl">
          <p>
            <em>-- Sem valores --</em>
          </p>
          <p>(ノ#-_-)ノ ミ┴┴</p>
        </div>
      )}
    </>
  );
}
