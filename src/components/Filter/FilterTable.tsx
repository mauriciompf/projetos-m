import useThemeContext from "../../customHooks/useThemeContext";

export const tableHeaders = [
  "ID",
  "Nome",
  "Idade",
  "Sexo",
  "Email",
  "Telefone",
];

export default function FilterTable({ usersData }) {
  const getSexNameTranslated = (sex: string) =>
    sex === "female" ? "Feminino" : "Masculino";

  const { theme } = useThemeContext();

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
        {usersData.map((user) => (
          <tr
            className={`${theme === "dark" ? ": odd:bg-slate-500 even:bg-black" : "odd:bg-white even:bg-gray-200"}`}
            key={user.id}
          >
            <td className="text-center ring-1 ring-black">{user.id}</td>
            <td className="p-2 ring-1 ring-black">{user.firstName}</td>
            <td className="p-2 text-center ring-1 ring-black">{user.age}</td>
            <td className="p-2 ring-1 ring-black">
              {getSexNameTranslated(user.gender)}
            </td>
            <td className="p-2 ring-1 ring-black">{user.email}</td>
            <td className="p-2 ring-1 ring-black">{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
