import { useToggleContext } from "../context/ToggleContext";
import useToggleDropDown from "../customHooks/useToggleDropDown";
import { tableHeaders } from "./Filter/FilterTable";
import ListItem from "./ListItem";
import HeaderControl from "./HeaderControl";

type ColumnSelectorProps = {
  restrictedList?: string[];
};

export default function ColumnSelector({
  restrictedList,
}: ColumnSelectorProps) {
  // FIXME Same state shared by SortBy and Filter. Create 2 diff contexts
  const { selectColumn } = useToggleContext();

  const {
    removeSelectedColumn,
    handleToggleSelectColumn,
    handleSelectColumn,
    toggleSelectColumn,
  } = useToggleDropDown();

  return (
    <div>
      {selectColumn ? (
        <HeaderControl
          onClick={() => removeSelectedColumn(selectColumn)}
          headerLabel={selectColumn}
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
