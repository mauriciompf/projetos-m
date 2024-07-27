import { useEffect } from "react";
import { useFilterSearchContext } from "../../context/FilterSearchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useToggleContext } from "../../context/ToggleContext";
import useToggleDropDown from "../../customHooks/useToggleDropDown";
import tableHeaders from "../../utils/tableHeaders";
import highlightText from "../../utils/highlightText";

type UsersData = {
  id: number;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
};

type FilterTableProps = {
  usersData: UsersData[];
};

export default function FilterTable({ usersData }: FilterTableProps) {
  const { orderByParams } = useToggleContext();
  const { selectColumn: selectColumnSortBy } = useToggleDropDown("sortby");
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { theme } = useThemeContext();
  const { searchParams, statusParams, setFiltedTableLength } =
    useFilterSearchContext();

  const getSexNameTranslated = (sex: string) =>
    sex === "female" ? "Feminino" : "Masculino";

  const sortedUserData = () => {
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
    }

    return usersDataCopy;
  };

  const filteredAndSortedUserData = () => {
    const inputSearch = searchParams.get("value")?.trim();
    const statusLabel = statusParams.get("status");
    const isNumber = /^[0-9]+$/;
    const filterUsers = (callback: (user: UsersData) => boolean) =>
      sortedUserData().filter(callback);

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
            user.email.toLowerCase().startsWith(inputSearch!.toLowerCase());
        case "telefone":
          if (/[^\d]/.test(inputSearch)) return;
          return (user: UsersData) =>
            user.phone.substring(1).startsWith(inputSearch!);
        default:
          console.error("Default case");
          return;
      }
    };

    const searchCondition = getSearchCondition();

    if (!searchCondition) {
      return sortedUserData();
    }

    return filterUsers(
      statusLabel === "é" ? searchCondition : (user) => !searchCondition(user),
    );
  };

  useEffect(() => {
    setFiltedTableLength(filteredAndSortedUserData().length);
  }, [filteredAndSortedUserData().length]);

  return (
    <table className="relative mx-auto w-[80%] table-auto">
      <thead>
        <tr
          className={`${theme === "dark" ? "bg-slate-700" : "bg-[#282A2D] text-white"} sticky top-0 z-10`}
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
        {filteredAndSortedUserData().map((user) => {
          const { id, firstName, age, gender, email, phone } = user;
          const searchTerm = searchParams.get("value") || "";
          return (
            <tr
              className={`${theme === "dark" ? "odd:bg-[#25282a] even:bg-[#181a1b]" : "odd:bg-slate-300 even:bg-white"}`}
              key={user.id}
            >
              <td className="text-center">
                {selectColumnFilter === "id"
                  ? highlightText(id.toString(), searchTerm)
                  : id}
              </td>
              <td className="p-2 text-center">
                {selectColumnFilter === "nome"
                  ? highlightText(firstName, searchTerm)
                  : firstName}
              </td>
              <td className="p-2 text-center">
                {selectColumnFilter === "idade"
                  ? highlightText(age.toString(), searchTerm)
                  : age}
              </td>
              <td className="p-2 text-center">
                {getSexNameTranslated(gender)}
              </td>
              <td className="p-2">
                {selectColumnFilter === "email"
                  ? highlightText(email, searchTerm)
                  : email}
              </td>
              <td className="p-2 text-center">
                {selectColumnFilter === "telefone"
                  ? highlightText(phone, searchTerm)
                  : phone}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
