import formatDate from "../../utils/formatDate";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import { useTableContext } from "../../context/TableContext";
import useFilter from "../../customHooks/useFilter";
import { useThemeContext } from "../../context/ThemeContext";
import useTableBody from "../../customHooks/useTableBody";

export default function TableBody() {
  const { theme } = useThemeContext();
  const { userData } = useTableContext();
  const { filteredUserData } = useFilter();
  const { highLightMatch } = useTableBody();

  return (
    <tbody>
      {userData &&
        filteredUserData().map((userData) => (
          <tr
            key={userData.id}
            className={`${theme === "dark" ? "text-gray-300 odd:bg-jet even:bg-[#181a1b]" : "text-jet odd:bg-slate-300 even:bg-columbia"}`}
          >
            <td className="p-2">{highLightMatch("id", userData.id)}</td>
            <td>{highLightMatch("nome", userData.firstName)}</td>
            <td>{highLightMatch("idade", userData.age)}</td>
            <td>{getSexNameTranslated(userData.gender)}</td>
            <td className="px-6 text-left">
              {highLightMatch("email", userData.email)}
            </td>
            <td>{highLightMatch("telefone", userData.phone)}</td>
            <td>{formatDate(userData.birthDate)}</td>
          </tr>
        ))}
    </tbody>
  );
}
