import { useEffect } from "react";
import { useTableContext } from "../context/TableContext";
import { highlightText } from "../utils/highlightText";
import useFilter from "./useFilter";
import useToggleDropDown from "./useToggleDropDown";

const useTableBody = () => {
  const { selectColumn: selectColumnFilter } = useToggleDropDown("filter");
  const { searchParams, statusParams, setFiltedTableLength } =
    useTableContext();
  const { filteredUserData } = useFilter();

  const searchTerm = searchParams.get("value") || "";

  const highLightMatch = (columnName: string, dataValue: string | number) => {
    if (statusParams.get("status") === "não é") return dataValue;

    if (selectColumnFilter === columnName)
      return highlightText(dataValue.toString(), searchTerm);

    return dataValue;
  };

  // Set the table length filtered
  useEffect(() => {
    setFiltedTableLength(filteredUserData().length);
  }, [filteredUserData, setFiltedTableLength]);

  return { highLightMatch };
};

export default useTableBody;
