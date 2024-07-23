import { useRef, RefObject } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";
import ListItem from "../../ListItem";
import HeaderControl from "../../HeaderControl";
import { useToggleContext } from "../../../context/ToggleContext";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import useClickOutside from "../../../customHooks/useClickOutside";
import ColumnSelector from "../../ColumnSelector";
import toCapitalizeCase from "../../../utils/toCapitalizeCase";

type SortByBoxProps = {
  refSortByBtn: RefObject<HTMLButtonElement>;
  setToggleSortBy: (val: boolean) => void;
};
export default function SortByBox({
  refSortByBtn,
  setToggleSortBy,
}: SortByBoxProps) {
  const { orderByParams } = useToggleContext();
  const refSortByBox = useRef<HTMLElement | null>(null);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  useClickOutside(refSortByBox, refSortByBtn, () => setToggleSortBy(false));

  // HACK useSearchParams
  const { handleToggleOrderBy, handleSelectOrderBy, toggleOrderBy } =
    useToggleDropDown("sortby");

  return (
    <WrapSettingsBox refElem={refSortByBox}>
      <ColumnSelector
        keyName="sortby"
        restrictedList={["Sexo", "Email", "Telefone"]}
      />

      <div>
        {orderByParams.has("orderby") ? (
          <HeaderControl
            onClick={handleToggleOrderBy}
            isDropDownOpen={toggleOrderBy}
            headerLabel={toCapitalizeCase(orderByParams.get("orderby"))}
          />
        ) : (
          <HeaderControl
            onClick={handleToggleOrderBy}
            isDropDownOpen={toggleOrderBy}
            headerLabel={"Ordernar por"}
          />
        )}

        {toggleOrderBy && (
          <ul>
            {OrderByLabels.map((label) => (
              <ListItem
                list={label}
                key={label}
                handleClick={() => handleSelectOrderBy(label)}
              />
            ))}
          </ul>
        )}
      </div>
    </WrapSettingsBox>
  );
}
