import { tableHeaders } from "../FilterTable";
import { useRef, RefObject } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import SortByListItem from "./SortByListItem";
import SortByHeader from "./SortByHeader";
import { useToggleContext } from "../../../context/ToggleContext";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import useClickOutside from "../../../customHooks/useClickOutside";

type SortByBoxProps = {
  refSortByBtn: RefObject<HTMLButtonElement>;
  setToggleSortBy: (val: boolean) => void;
};
// #TODO Change to global icon
const removeButton = <FontAwesomeIcon icon={faSquareXmark} />;
export default function SortByBox({
  refSortByBtn,
  setToggleSortBy,
}: SortByBoxProps) {
  const { orderBy, selectColumn } = useToggleContext();

  const refSortByBox = useRef<HTMLElement | null>(null);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];
  useClickOutside(refSortByBox, refSortByBtn, () => setToggleSortBy(false));

  const {
    removeSelectedColumn,
    handleToggleSelectColumn,
    handleSelectColumn,
    handleToggleOrderBy,
    handleOrderBy,
    toggleSelectColumn,
    toggleOrderBy,
  } = useToggleDropDown();

  return (
    <WrapSettingsBox refElem={refSortByBox}>
      {/* #HACK component */}
      <div>
        {selectColumn ? (
          <SortByHeader
            onClick={() => removeSelectedColumn(selectColumn)}
            headerLabel={selectColumn}
            isRemoveButton={true}
            removeButton={removeButton}
          />
        ) : (
          <SortByHeader
            onClick={handleToggleSelectColumn}
            isOrderByOpen={toggleSelectColumn}
            headerLabel={"Selecione uma coluna"}
          />
        )}

        {!selectColumn && toggleSelectColumn && (
          <ul>
            {tableHeaders
              .filter(
                (header) =>
                  header !== "Sexo" &&
                  header !== "Email" &&
                  header !== "Telefone",
              )
              .map((header) => (
                <SortByListItem
                  key={header}
                  list={header}
                  handleClick={() => handleSelectColumn(header)}
                />
              ))}
          </ul>
        )}
      </div>

      <div>
        {orderBy ? (
          <SortByHeader
            onClick={handleToggleOrderBy}
            isOrderByOpen={toggleOrderBy}
            headerLabel={orderBy}
          />
        ) : (
          <SortByHeader
            onClick={handleToggleOrderBy}
            isOrderByOpen={toggleOrderBy}
            headerLabel={"Ordernar por"}
          />
        )}

        {toggleOrderBy && (
          <ul>
            {OrderByLabels.map((label) => (
              <SortByListItem
                list={label}
                key={label}
                handleClick={() => handleOrderBy(label)}
              />
            ))}
          </ul>
        )}
      </div>
    </WrapSettingsBox>
  );
}
