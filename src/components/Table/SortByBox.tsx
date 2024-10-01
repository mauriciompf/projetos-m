import { useRef, RefObject } from "react";
import WrapSettingsBox from "../WrapSettingsBox";
import ListItem from "./ListItem";
import HeaderControl from "./HeaderControl";
import useClickOutside from "../../customHooks/useClickOutside";
import ColumnSelector from "./ColumnSelector";
import toCapitalizeCase from "../../utils/toCapitalizeCase";
import ResetParams from "./ResetParams";
import useSortByHandlers from "../../customHooks/useSortByHandlers";
import { useTableContext } from "../../context/TableContext";
import { useTableToggleContext } from "../../context/TableToggleContext";
import { orderByLabels } from "../../utils/constants";

export default function SortByBox({
  refSortByBtn,
}: {
  refSortByBtn: RefObject<HTMLButtonElement>;
}) {
  const { setOrderByToggle, handleSelectOrderBy, orderByToggle } =
    useSortByHandlers();
  const { setToggleSortBy } = useTableToggleContext();
  const { orderByParams, searchParams } = useTableContext();

  const refSortByBox = useRef<HTMLElement | null>(null);

  useClickOutside([refSortByBox, refSortByBtn], () => setToggleSortBy(false));

  return (
    <WrapSettingsBox
      refElem={refSortByBox}
      className={`${searchParams.has("sortby") && searchParams.has("orderby") && "pt-0"} grid`}
    >
      <ResetParams params={["sortby", "orderby"]} />

      <div className="flex flex-col gap-2 md:flex-row">
        <ColumnSelector
          keyName="sortby"
          restrictedList={["Sexo", "Email", "Telefone"]}
        />

        <div>
          {orderByParams.has("orderby") ? (
            <HeaderControl
              onClick={() => setOrderByToggle(!orderByToggle)}
              isDropDownOpen={orderByToggle}
              headerLabel={toCapitalizeCase(orderByParams.get("orderby"))}
              className="w-[10rem]"
            />
          ) : (
            <HeaderControl
              onClick={() => setOrderByToggle(!orderByToggle)}
              isDropDownOpen={orderByToggle}
              headerLabel={"Ordernar por"}
              className="w-[10rem]"
            />
          )}

          {orderByToggle && (
            <ul>
              {orderByLabels.map((label) => (
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
