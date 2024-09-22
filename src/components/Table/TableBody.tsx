import { useEffect } from "react";
import useToggleDropDown from "../../customHooks/useToggleDropDown";
import { highlightText } from "../../utils/highlightText";
import { useThemeContext } from "../../context/ThemeContext";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import { formatDate } from "../../utils/formatDate";
import { useTableContext } from "../../context/TableContext";
import useFilter from "../../customHooks/useFilter";

export default function TableBody() {
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { searchParams, statusParams, userData, setFiltedTableLength } =
    useTableContext();
  const { filteredAndSortedUserData } = useFilter();
  const { theme } = useThemeContext();

  const searchTerm = searchParams.get("value") || ""; // Get the search term from the input value param

  // columnName: name of the column
  // dataValue: the exact data value extracted from the API
  const highLightMatch = (columnName: string, dataValue: string | number) => {
    if (statusParams.get("status") === "não é") {
      return dataValue;
    }

    if (selectColumnFilter === columnName) {
      return highlightText(dataValue.toString(), searchTerm);
    }

    return dataValue;
  };

  useEffect(() => {
    setFiltedTableLength(filteredAndSortedUserData.length);
  }, [filteredAndSortedUserData, setFiltedTableLength]);

  return (
    <tbody>
      {userData &&
        filteredAndSortedUserData.map((userData) => (
          <tr
            key={userData.id}
            className={`${theme === "dark" ? "text-gray-300 odd:bg-[#25282a] even:bg-[#181a1b]" : "text-jet odd:bg-slate-300 even:bg-columbia"} `}
          >
            <td className="text-center">{highLightMatch("id", userData.id)}</td>
            <td className="p-2 text-center">
              {highLightMatch("nome", userData.firstName)}
            </td>
            <td className="p-2 text-center">
              {highLightMatch("idade", userData.age)}
            </td>
            <td className="p-2 text-center">
              {getSexNameTranslated(userData.gender)}
            </td>
            <td className="p-2">{highLightMatch("email", userData.email)}</td>
            <td className="p-2 text-center">
              {highLightMatch("telefone", userData.phone)}
            </td>
            <td className="p-2 text-center">
              {formatDate(userData.birthDate)}
            </td>
          </tr>
        ))}
    </tbody>
  );
}
