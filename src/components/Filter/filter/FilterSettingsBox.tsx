import WrapSettingsBox from "../../WrapSettingsBox";
import ColumnSelector from "../../ColumnSelector";
import useClickOutside from "../../../customHooks/useClickOutside";
import { RefObject, useEffect, useRef, useState } from "react";
import HeaderControl from "../../HeaderControl";
import ListItem from "../../ListItem";
import { useThemeContext } from "../../../context/ThemeContext";
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
  const [statusToggle, setStatusToggle] = useState(false);
  const refFilterBox = useRef<HTMLElement | null>(null);
  useClickOutside(refFilterBox, refFilterBtn, () => setToggleFilter(false));
  const { theme } = useThemeContext();
  const statusLabels = ["É", "Não É"];
  const { selectColumn } = useToggleDropDown("filter");
  const { searchParams, setSearchParams, statusParams, setStatusParams } =
    useFilterSearchContext();

  const handleStatusToggle = () => setStatusToggle((prev) => !prev);

  const handleStatusSelect = (status: string) => {
    setStatusToggle(false);
    statusParams.set("status", status);
    setStatusParams(statusParams);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (selectColumn) {
      searchParams.set("value", val);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (!selectColumn) {
      searchParams.delete("value");
      setSearchParams("");
    }
  }, [selectColumn]);

  return (
    <WrapSettingsBox refElem={refFilterBox}>
      <ColumnSelector keyName="filter" />

      <div>
        {!statusToggle ? (
          <HeaderControl
            headerLabel={statusParams.get("status") || "Status"}
            onClick={handleStatusToggle}
            isDropDownOpen={statusToggle}
          />
        ) : (
          <HeaderControl
            headerLabel={statusParams.get("status")}
            onClick={handleStatusToggle}
            isDropDownOpen={statusToggle}
          />
        )}

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
          placeholder="👌"
          value={searchParams.get("value") || ""}
          onChange={handleOnChange}
        />
      </div>
    </WrapSettingsBox>
  );
}
