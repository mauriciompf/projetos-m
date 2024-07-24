import useToggleDropDown from "../customHooks/useToggleDropDown";
import tableHeaders from "../utils/tableHeaders";
import ListItem from "./ListItem";
import HeaderControl from "./HeaderControl";
import toCapitalizeCase from "../utils/toCapitalizeCase";

type ColumnSelectorProps = {
  keyName: string;
  restrictedList?: string[];
};

export default function ColumnSelector({
  keyName,
  restrictedList,
}: ColumnSelectorProps) {
  const {
    removeSelectedColumn,
    handleToggleSelectColumn,
    handleSelectColumn,
    toggleSelectColumn,
    selectColumn,
  } = useToggleDropDown(keyName);

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
          onClick={handleToggleSelectColumn}
          isDropDownOpen={toggleSelectColumn}
          headerLabel={"Selecione uma coluna"}
        />
      )}

      {!selectColumn && toggleSelectColumn && (
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
