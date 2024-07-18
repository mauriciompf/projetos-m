import WrapSettingsBox from "../../WrapSettingsBox";
import ColumnSelector from "../../ColumnSelector";
import useClickOutside from "../../../customHooks/useClickOutside";
import { RefObject, useRef, useState } from "react";
import HeaderControl from "../../HeaderControl";
import ListItem from "../../ListItem";

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
  const statusLabels = ["É", "Não É"];

  const handleStatusToggle = () => setStatusToggle((prev) => !prev);

  const handleStatusSelect = (status: string) => {
    setStatusDropdown(status);
  };

  return (
    <WrapSettingsBox refElem={refFilterBox}>
      <ColumnSelector />

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
      <div>col 3</div>
    </WrapSettingsBox>
  );
}
