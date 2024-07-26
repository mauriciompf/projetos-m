import { useRef, RefObject } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";
import ListItem from "../../ListItem";
import HeaderControl from "../../HeaderControl";
import { useToggleContext } from "../../../context/ToggleContext";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import useClickOutside from "../../../customHooks/useClickOutside";
import ColumnSelector from "../../ColumnSelector";
import toCapitalizeCase from "../../../utils/toCapitalizeCase";
import { useFilterSearchContext } from "../../../context/FilterSearchContext";
import Button from "../../Button";
import ResetParams from "../../../utils/ResetParams";

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

  const { searchParams } = useFilterSearchContext();

  return (
    <WrapSettingsBox
      refElem={refSortByBox}
      className={`grid ${searchParams.has("sortby") && searchParams.has("orderby") && "pt-2"} `}
    >
      <ResetParams valueOne={"sortby"} valueTwo={"orderby"} />

      <div className="flex gap-2">
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
      </div>
    </WrapSettingsBox>
  );
}
