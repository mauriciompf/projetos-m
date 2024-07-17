import { tableHeaders } from "../FilterTable";
import { useEffect, useRef, useState, useCallback } from "react";
import WrapSettingsBox from "../../WrapSettingsBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import SortByListItem from "./SortByListItem";
import SortByHeader from "./SortByHeader";
import { useToggleContext } from "../../../context/ToggleContext";

type SortByBoxProps = {
  orderBy: string;
  selectColumn: string;
  setOrderBy: (val: string) => void;
  refSortByBtn: any;
  setSelectColumn: (val: string) => void;
  setToggleSortBy?: (val: boolean) => void;
};

const removeButton = <FontAwesomeIcon icon={faSquareXmark} />;

// #FIXME type any
export default function SortByBox({ refSortByBtn, setToggleSortBy }: any) {
  const { orderBy, setOrderBy, selectColumn, setSelectColumn } =
    useToggleContext();

  // #HACK custom hook
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);
  const refSortByBox = useRef<HTMLElement | null>(null);
  const OrderByLabels = ["Crescente", "Decrescente", "Padrão"];

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      refSortByBox.current &&
      !refSortByBox.current.contains(target) &&
      target !== refSortByBtn.current
    ) {
      setToggleSortBy!(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const removeSelectedColumn = (col: string) => {
    tableHeaders.forEach((header) => {
      if (col === header) setSelectColumn("");
    });

    OrderByLabels.forEach((label) => {
      if (col === label) setOrderBy("");
    });
  };

  const handleToggleSelectColumn = () => {
    setToggleSelectColumn(!toggleSelectColumn);
  };

  const handleSelectColumn = (header: string) => {
    setSelectColumn(header);
  };

  const handleToggleOrderBy = () => {
    setToggleOrderBy(!toggleOrderBy);
  };

  const handleOrderBy = (label: string) => {
    setOrderBy(label);
    setToggleOrderBy(false);
  };

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
                handleClick={() => handleOrderBy(label)}
              />
            ))}
          </ul>
        )}
      </div>
    </WrapSettingsBox>
  );
}
