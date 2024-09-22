import { useThemeContext } from "../../context/ThemeContext";
import { tableHeaders } from "../../utils/constants";

export default function TableHead() {
  const { theme } = useThemeContext();

  return (
    <thead>
      <tr
        className={`${theme === "dark" ? "bg-slate-700 text-gray-100" : "bg-[#282A2D] text-gray-100"} sticky z-0 min-[1240px]:top-[4.75rem]`}
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
  );
}
