import { useRef, RefObject } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";
import ListItem from "../../ListItem";
import HeaderControl from "../../HeaderControl";
import { useToggleContext } from "../../../context/ToggleContext";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import useClickOutside from "../../../customHooks/useClickOutside";
import ColumnSelector from "../../ColumnSelector";

type SortByBoxProps = {
  refSortByBtn: RefObject<HTMLButtonElement>;
  setToggleSortBy: (val: boolean) => void;
};
export default function SortByBox({
  refSortByBtn,
  setToggleSortBy,
}: SortByBoxProps) {
  const { orderBy } = useToggleContext();

  const refSortByBox = useRef<HTMLElement | null>(null);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  useClickOutside(refSortByBox, refSortByBtn, () => setToggleSortBy(false));

  const { handleToggleOrderBy, handleSelectOrderBy, toggleOrderBy } =
    useToggleDropDown("sortByBox");

  return (
    <WrapSettingsBox refElem={refSortByBox}>
      <ColumnSelector
        keyName="sortByBox"
        restrictedList={["Sexo", "Email", "Telefone"]}
      />

      <div>
        {orderBy ? (
          <HeaderControl
            onClick={handleToggleOrderBy}
            isDropDownOpen={toggleOrderBy}
            headerLabel={orderBy}
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
