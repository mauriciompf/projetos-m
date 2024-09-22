import useToggleDropDown from "../../customHooks/useToggleDropDown";
import { highlightText } from "../../utils/highlightText";
import { useThemeContext } from "../../context/ThemeContext";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import { formatDate } from "../../utils/formatDate";
import { UsersData } from "./FilterTable";
import { useTableParamsContext } from "../../context/TableParamsContext";

type UserRowProps = {
  user: UsersData;
};

export default function UserRow({ user }: UserRowProps) {
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { searchParams, statusParams } = useTableParamsContext();
  const { theme } = useThemeContext();

  const { id, firstName, age, gender, email, phone, birthDate } = user;

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

  return (
    <tr
      className={`${theme === "dark" ? "text-gray-300 odd:bg-[#25282a] even:bg-[#181a1b]" : "text-jet odd:bg-slate-300 even:bg-columbia"} `}
    >
      <td className="text-center">{highLightMatch("id", id)}</td>
      <td className="p-2 text-center">{highLightMatch("nome", firstName)}</td>
      <td className="p-2 text-center">{highLightMatch("idade", age)}</td>
      <td className="p-2 text-center">{getSexNameTranslated(gender)}</td>
      <td className="p-2">{highLightMatch("email", email)}</td>
      <td className="p-2 text-center">{highLightMatch("telefone", phone)}</td>
      <td className="p-2 text-center">{formatDate(birthDate)}</td>
    </tr>
  );
}
