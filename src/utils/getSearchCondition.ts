import { isNumber } from "./constants";
import getSexNameTranslated from "./getSexNameTranslated";
import { UserData } from "./types";

const getSearchCondition = (
  selectColumnFilter: string,
  searchParams: URLSearchParams,
  statusParams: URLSearchParams,
) => {
  const statusLabel = statusParams.get("status");
  const inputSearch = searchParams.get("value")?.trim();

  if ((!statusLabel && inputSearch === "Masculino") || !inputSearch) return;

  switch (selectColumnFilter) {
    case "id":
      if (!isNumber.test(inputSearch)) return;
      return (user: UserData) => user.id === Number(inputSearch);
    case "nome":
      return (user: UserData) =>
        user.firstName.toLowerCase().startsWith(inputSearch.toLowerCase());
    case "idade":
      if (!isNumber.test(inputSearch)) return;
      return (user: UserData) => user.age === Number(inputSearch);
    case "sexo":
      return (user: UserData) =>
        getSexNameTranslated(user.gender).toLowerCase() === inputSearch;
    case "email":
      return (user: UserData) =>
        user.email.toLowerCase().startsWith(inputSearch.toLowerCase());
    case "telefone":
      return (user: UserData) =>
        user.phone.substring(1).startsWith(inputSearch);
    default:
      return;
  }
};

export default getSearchCondition;
