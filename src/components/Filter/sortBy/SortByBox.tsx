import { useRef, RefObject } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";
import ListItem from "../../ListItem";
import HeaderControl from "../../HeaderControl";
import { useToggleContext } from "../../../context/ToggleContext";
import useClickOutside from "../../../customHooks/useClickOutside";
import ColumnSelector from "../../ColumnSelector";
import toCapitalizeCase from "../../../utils/toCapitalizeCase";
import { useFilterSearchContext } from "../../../context/FilterSearchContext";
import ResetParams from "../../../utils/ResetParams";
import useSortByHandlers from "../../../customHooks/useSortByHandlers";

type SortByBoxProps = {
  refSortByBtn: RefObject<HTMLButtonElement>;
  setToggleSortBy: (val: boolean) => void;
};

export default function SortByBox({
  refSortByBtn,
  setToggleSortBy,
}: SortByBoxProps) {
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  const refSortByBox = useRef<HTMLElement | null>(null);
  const { orderByParams } = useToggleContext();
  const { handleOrderByToggle, handleSelectOrderBy, orderByToggle } =
    useSortByHandlers();
  const { searchParams } = useFilterSearchContext();
  useClickOutside(refSortByBox, refSortByBtn, () => setToggleSortBy(false));

  return (
    <WrapSettingsBox
      refElem={refSortByBox}
      className={`grid ${searchParams.has("sortby") && searchParams.has("orderby") && "pt-0"} `}
    >
      <ResetParams valueOne={"sortby"} valueTwo={"orderby"} />

      <div className="flex flex-col gap-2 md:flex-row">
        <ColumnSelector
          keyName="sortby"
          restrictedList={["Sexo", "Email", "Telefone"]}
        />

        <div>
          {orderByParams.has("orderby") ? (
            <HeaderControl
              onClick={handleOrderByToggle}
              isDropDownOpen={orderByToggle}
              headerLabel={toCapitalizeCase(orderByParams.get("orderby"))}
              className="w-[10rem]"
            />
          ) : (
            <HeaderControl
              onClick={handleOrderByToggle}
              isDropDownOpen={orderByToggle}
              headerLabel={"Ordernar por"}
              className="w-[10rem]"
            />
          )}

          {orderByToggle && (
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
