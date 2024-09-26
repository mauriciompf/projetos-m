import formatDate from "../../utils/formatDate";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import { useTableContext } from "../../context/TableContext";
import useFilter from "../../customHooks/useFilter";
import { useThemeContext } from "../../context/ThemeContext";

export default function TableBody() {
  const { theme } = useThemeContext();
  const { userData } = useTableContext();
  const { filteredUserData, highLightMatch } = useFilter();

  return (
    <tbody>
      {userData &&
        filteredUserData().map((userData) => (
          <tr
            key={userData.id}
            className={`${theme === "dark" ? "even:bg-alt_black text-alt_white odd:bg-jet" : "even:bg-alt_white text-jet odd:bg-slate-300"}`}
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
