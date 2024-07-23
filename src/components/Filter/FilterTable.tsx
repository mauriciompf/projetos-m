import { useFilterSearchContext } from "../../context/FilterSearchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { useToggleContext } from "../../context/ToggleContext";
import useToggleDropDown from "../../customHooks/useToggleDropDown";

export const tableHeaders = [
  "ID",
  "Nome",
  "Idade",
  "Sexo",
  "Email",
  "Telefone",
];

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
  const { searchParams, statusParams } = useFilterSearchContext();

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
    const statusSearch = statusParams.get("status");
    const isString = /[\D]/g;

    const filterUsers = (callback: (user: UsersData) => boolean) =>
      sortedUserData().filter(callback);

    // FIXME Input error validation feedback
    if (!statusSearch || !inputSearch) {
      return sortedUserData();
    }

    // console.log("👌");

    switch (selectColumnFilter) {
      case "id":
        // FIXME Validation
        if (isString.test(inputSearch)) return sortedUserData();
        if (statusSearch === "é") {
          return filterUsers((user) => user.id === Number(inputSearch));
        }
        return filterUsers((user) => user.id !== Number(inputSearch));
      case "nome":
        return filterUsers((user) =>
          user.firstName.toLowerCase().startsWith(inputSearch!.toLowerCase()),
        );
      case "idade":
        if (isString.test(inputSearch)) return sortedUserData();

        return filterUsers((user) => user.age === Number(inputSearch));
      case "sexo":
        return filterUsers(
          (user) =>
            getSexNameTranslated(user.gender).toLowerCase() === inputSearch,
        );
      case "email":
        return filterUsers((user) =>
          user.email.startsWith(inputSearch.toLowerCase()),
        );
      case "telefone":
        return filterUsers((user) =>
          user.phone.substring(1).startsWith(inputSearch),
        );
    }

    return sortedUserData();
  };

  return (
    <table className="mx-auto w-[80%] table-auto rounded-lg">
      <thead>
        <tr className={`${theme === "dark" && "bg-slate-700"} `}>
          {tableHeaders.map((header) => (
            <th className="p-2 ring-1 ring-black" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredAndSortedUserData().map((user) => {
          const { id, firstName, age, gender, email, phone } = user;
          return (
            <tr
              className={`${theme === "dark" ? ": odd:bg-slate-500 even:bg-black" : "odd:bg-white even:bg-gray-200"}`}
              key={user.id}
            >
              <td className="text-center ring-1 ring-black">{id}</td>
              <td className="p-2 ring-1 ring-black">{firstName}</td>
              <td className="p-2 text-center ring-1 ring-black">{age}</td>
              <td className="p-2 ring-1 ring-black">
                {getSexNameTranslated(gender)}
              </td>
              <td className="p-2 ring-1 ring-black">{email}</td>
              <td className="p-2 ring-1 ring-black">{phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
