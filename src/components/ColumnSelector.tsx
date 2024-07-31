import useToggleDropDown from "../customHooks/useToggleDropDown";
import tableHeaders from "../utils/tableHeaders";
import ListItem from "./ListItem";
import HeaderControl from "./HeaderControl";
import toCapitalizeCase from "../utils/toCapitalizeCase";
import useSortByHandlers from "../customHooks/useSortByHandlers";

type ColumnSelectorProps = {
  keyName: string;
  restrictedList?: string[];
};

export default function ColumnSelector({
  keyName,
  restrictedList,
}: ColumnSelectorProps) {
  const {
    selectColumnToggle,
    handleSelectColumnToggle,
    removeSelectedColumn,
    handleSelectColumn,
    selectColumn,
  } = useToggleDropDown(keyName);

  const { orderByToggle } = useSortByHandlers();

  return (
    <div>
      {selectColumn ? (
        <HeaderControl
          onClick={() => removeSelectedColumn(selectColumn)}
          headerLabel={toCapitalizeCase(selectColumn)}
          isRemoveButton={true}
        />
      ) : (
        <HeaderControl
          onClick={handleSelectColumnToggle}
          isDropDownOpen={orderByToggle}
          headerLabel={"Selecione uma coluna"}
        />
      )}

      {!selectColumn && selectColumnToggle && (
        <ul>
          {tableHeaders
            .filter(
              (header) => !restrictedList || !restrictedList.includes(header),
            )
            .map((header) => (
              <ListItem
                key={header}
                list={header}
                handleClick={() => handleSelectColumn(header)}
              />
            ))}
        </ul>
      )}
    </div>
  );
}
