import { useTableContext } from "../../context/TableContext";
import useFilterAndSortStatus from "../../customHooks/useFilterAndSortStatus";
import toCapitalizeCase from "../../utils/toCapitalizeCase";

export default function SettingsInfo() {
  const { isFilter, isSortBy } = useFilterAndSortStatus();
  const { searchParams, statusParams } = useTableContext();

  return (
    <p className="grid text-base">
      {isSortBy && (
        <span>
          Ordenado por{" "}
          <strong>{toCapitalizeCase(searchParams.get("sortby"))}</strong> em
          ordem <strong>{searchParams.get("orderby")}</strong>
        </span>
      )}

      {isFilter && (
        <span>
          Filtrado por{" "}
          <strong>{toCapitalizeCase(searchParams.get("filter"))}</strong>
          {statusParams.has("status")
            ? ` (${statusParams.get("status")})`
            : ":"}{" "}
          <strong>{searchParams.get("value")}</strong>
        </span>
      )}
    </p>
  );
}
