import useThemeContext from "../../customHooks/useThemeContext";

export const tableHeaders = [
  "ID",
  "Nome",
  "Idade",
  "Sexo",
  "Email",
  "Telefone",
];

export default function FilterTable({ selectColumn, usersData, orderBy }) {
  const { theme } = useThemeContext();

  const getSexNameTranslated = (sex: string) =>
    sex === "female" ? "Feminino" : "Masculino";

  const sortedUserData = () => {
    const usersDataCopy = [...usersData];
    switch (selectColumn) {
      case "ID":
        if (orderBy === "DESC") {
          return usersDataCopy.sort((a, b) => b.id - a.id);
        }
        break;
      case "Nome":
        if (orderBy === "ASC") {
          return usersDataCopy.sort((a, b) =>
            a.firstName.localeCompare(b.firstName),
          );
        } else if (orderBy === "DESC") {
          return usersDataCopy.sort((a, b) =>
            b.firstName.localeCompare(a.firstName),
          );
        }
        break;
    }

    return usersDataCopy;
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
        {sortedUserData()
          // .filter((user) => user.firstName  arr.sort())
          .map((user) => {
            return (
              <tr
                className={`${theme === "dark" ? ": odd:bg-slate-500 even:bg-black" : "odd:bg-white even:bg-gray-200"}`}
                key={user.id}
              >
                <td className="text-center ring-1 ring-black">{user.id}</td>
                <td className="p-2 ring-1 ring-black">{user.firstName}</td>
                <td className="p-2 text-center ring-1 ring-black">
                  {user.age}
                </td>
                <td className="p-2 ring-1 ring-black">
                  {getSexNameTranslated(user.gender)}
                </td>
                <td className="p-2 ring-1 ring-black">{user.email}</td>
                <td className="p-2 ring-1 ring-black">{user.phone}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
