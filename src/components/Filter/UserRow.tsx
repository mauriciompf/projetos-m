import useToggleDropDown from "../../customHooks/useToggleDropDown";
import { highlightText } from "../../utils/highlightText";
import { useFilterSearchContext } from "../../context/FilterSearchContext";
import { useThemeContext } from "../../context/ThemeContext";
import getSexNameTranslated from "../../utils/getSexNameTranslated";
import { formatDate } from "../../utils/formatDate";
import { UsersData } from "./FilterTable";

type UserRowProps = {
  user: UsersData;
};

export default function UserRow({ user }: UserRowProps) {
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { searchParams } = useFilterSearchContext();
  const { theme } = useThemeContext();

  const { id, firstName, age, gender, email, phone, birthDate } = user;

  const searchTerm = searchParams.get("value") || ""; // Get the search term from the input value param

  // columnName: name of the column
  // dataValue: the exact data value extracted from the API
  const highLightMatch = (columnName: string, dataValue: string | number) => {
    if (selectColumnFilter === columnName) {
      return highlightText(dataValue.toString(), searchTerm);
    }

    return dataValue;
  };

  return (
    <tr
      className={`${theme === "dark" ? "odd:bg-[#25282a] even:bg-[#181a1b]" : "odd:bg-slate-300 even:bg-white"}`}
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
