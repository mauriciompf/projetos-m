import WrapSettingsBox from "../../WrapSettingsBox";
import ColumnSelector from "../../ColumnSelector";
import useClickOutside from "../../../customHooks/useClickOutside";
import { RefObject, useEffect, useRef, useState } from "react";
import HeaderControl from "../../HeaderControl";
import ListItem from "../../ListItem";
import { useThemeContext } from "../../../context/ThemeContext";
import { useSearchParams } from "react-router-dom";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import { useFilterSearchContext } from "../../../context/FilterSearchContext";

type FilterSettingsBoxProps = {
  refFilterBtn: RefObject<HTMLButtonElement>;
  setToggleFilter: (val: boolean) => void;
};

export default function FilterSettingsBox({
  refFilterBtn,
  setToggleFilter,
}: FilterSettingsBoxProps) {
  const [statusDropdown, setStatusDropdown] = useState("");
  const [statusToggle, setStatusToggle] = useState(false);
  const refFilterBox = useRef<HTMLElement | null>(null);
  useClickOutside(refFilterBox, refFilterBtn, () => setToggleFilter(false));
  const { theme } = useThemeContext();
  const statusLabels = ["É", "Não É"];
  const { selectColumn } = useToggleDropDown("filter");
  const { searchParams, setSearchParams } = useFilterSearchContext();

  const handleStatusToggle = () => setStatusToggle((prev) => !prev);

  const handleStatusSelect = (status: string) => {
    setStatusDropdown(status);
    setStatusToggle(false);
  };

  // #FIXME prevent undefined selectColumn
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    searchParams.set(selectColumn, val);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchParams.delete(selectColumn);
    setSearchParams("");
  }, [selectColumn]);

  return (
    <WrapSettingsBox refElem={refFilterBox}>
      <ColumnSelector keyName="filter" />

      <div>
        <HeaderControl
          headerLabel={statusDropdown || "É"}
          onClick={handleStatusToggle}
          isDropDownOpen={statusToggle}
        />

        {statusToggle && (
          <ul>
            {statusLabels.map((label) => (
              <ListItem
                list={label}
                key={label}
                handleClick={() => handleStatusSelect(label)}
              />
            ))}
          </ul>
        )}
      </div>
      <div>
        <input
          type="text"
          className={`border ${theme === "dark" ? "border-white" : "border-black"} bg-transparent p-2 outline-none hover:ring-4`}
          placeholder="..."
          value={searchParams.get(selectColumn) || ""}
          onChange={handleOnChange}
        />
      </div>
    </WrapSettingsBox>
  );
}
