import { useTableContext } from "../context/TableContext";
import useToggleDropDown from "./useToggleDropDown";

const useSortBy = () => {
  const { selectColumn: selectColumnSortBy } = useToggleDropDown("sortby");
  const { userData, orderByParams } = useTableContext();

  const sortedUserData = userData && [...userData];
  const descOrder = orderByParams.get("orderby") === "decrescente";
  const ascOrder = orderByParams.get("orderby") === "crescente";

  switch (selectColumnSortBy) {
    case "id":
      sortedUserData.sort((a, b) => (descOrder ? b.id - a.id : a.id - b.id));
      break;
    case "nome":
      sortedUserData.sort((a, b) =>
        ascOrder
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName),
      );
      break;
    case "idade":
      sortedUserData.sort((a, b) => (ascOrder ? a.age - b.age : b.age - a.age));
      break;
    case "data de nasc.":
      sortedUserData.sort((a, b) =>
        ascOrder
          ? a.birthDate.localeCompare(b.birthDate)
          : b.birthDate.localeCompare(a.birthDate),
      );
      break;
    default:
      break;
  }

  return { sortedUserData };
};

export default useSortBy;
