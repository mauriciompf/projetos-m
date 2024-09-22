import useToggleDropDown from "../customHooks/useToggleDropDown";
import ListItem from "./ListItem";
import HeaderControl from "./HeaderControl";
import toCapitalizeCase from "../utils/toCapitalizeCase";
import useSortByHandlers from "../customHooks/useSortByHandlers";
import { tableHeaders } from "../utils/constants";

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
    setSelectColumnToggle,
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
          className="w-[10rem]"
        />
      ) : (
        <HeaderControl
          onClick={() => setSelectColumnToggle(!selectColumnToggle)}
          isDropDownOpen={orderByToggle}
          headerLabel={"Coluna"}
          className="w-[10rem]"
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
