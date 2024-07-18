import WrapSettingsBox from "../../WrapSettingsBox";
import ColumnSelector from "../../ColumnSelector";
import useClickOutside from "../../../customHooks/useClickOutside";
import { RefObject, useRef, useState } from "react";
import HeaderControl from "../../HeaderControl";
import ListItem from "../../ListItem";
import { useThemeContext } from "../../../context/ThemeContext";

type FilterSettingsBoxProps = {
  refFilterBtn: RefObject<HTMLButtonElement>;
  setToggleFilter: (val: boolean) => void;
};

export default function FilterSettingsBox({
  refFilterBtn,
  setToggleFilter,
}: FilterSettingsBoxProps) {
  // HACK useSearchParams instead of useState
  const [statusDropdown, setStatusDropdown] = useState("");
  const [statusToggle, setStatusToggle] = useState(false);
  const refFilterBox = useRef<HTMLElement | null>(null);
  useClickOutside(refFilterBox, refFilterBtn, () => setToggleFilter(false));
  const { theme } = useThemeContext();
  const statusLabels = ["É", "Não É"];

  const handleStatusToggle = () => setStatusToggle((prev) => !prev);

  const handleStatusSelect = (status: string) => {
    setStatusDropdown(status);
    setStatusToggle(false);
  };

  return (
    <WrapSettingsBox refElem={refFilterBox}>
      <ColumnSelector keyName="Filter" />

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
        />
      </div>
    </WrapSettingsBox>
  );
}
