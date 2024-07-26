import WrapSettingsBox from "../../WrapSettingsBox";
import ColumnSelector from "../../ColumnSelector";
import useClickOutside from "../../../customHooks/useClickOutside";
import { RefObject, useEffect, useRef, useState } from "react";
import HeaderControl from "../../HeaderControl";
import ListItem from "../../ListItem";
import { useThemeContext } from "../../../context/ThemeContext";
import useToggleDropDown from "../../../customHooks/useToggleDropDown";
import { useFilterSearchContext } from "../../../context/FilterSearchContext";
import toCapitalizeCase from "../../../utils/toCapitalizeCase";
import Button from "../../Button";
import ResetParams from "../../../utils/ResetParams";

type FilterBoxProps = {
  refFilterBtn: RefObject<HTMLButtonElement>;
  setToggleFilter: (val: boolean) => void;
};

export default function FilterBox({
  refFilterBtn,
  setToggleFilter,
}: FilterBoxProps) {
  const [statusToggle, setStatusToggle] = useState(false);
  const refFilterBox = useRef<HTMLElement | null>(null);
  useClickOutside(refFilterBox, refFilterBtn, () => setToggleFilter(false));
  const { theme } = useThemeContext();
  const { selectColumn } = useToggleDropDown("filter");
  const { searchParams, setSearchParams, statusParams, setStatusParams } =
    useFilterSearchContext();
  const statusLabels = ["É", "Não É"];
  const sexLabels = ["Masculino", "Feminino"];

  const handleSelectSex = (sex: string) => {
    searchParams.set("value", sex);
    setSearchParams(searchParams);
  };

  const handleStatusToggle = () => setStatusToggle((prev) => !prev);

  const handleStatusSelect = (status: string) => {
    setStatusToggle(false);
    statusParams.set("status", status.toLowerCase());
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
      setSearchParams(searchParams);
      // setSearchParams("");
    }
  }, [selectColumn]);

  return (
    <WrapSettingsBox
      refElem={refFilterBox}
      className={`grid ${searchParams.has("filter") && searchParams.has("status") && "pt-2"}`}
    >
      <ResetParams valueOne="filter" valueTwo="status" valueThree="value" />

      <div className="flex gap-2">
        <ColumnSelector keyName="filter" />
        {selectColumn !== "sexo" && (
          <div>
            <HeaderControl
              headerLabel={
                (statusParams.has("status") &&
                  toCapitalizeCase(statusParams.get("status"))) ||
                "Status"
              }
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
        )}
        <div>
          {selectColumn === "sexo" ? (
            <div className="flex gap-1">
              {sexLabels.map((label) => (
                <Button
                  key={label}
                  onClick={() => handleSelectSex(label.toLowerCase())}
                  className={`border p-2 ${theme === "dark" ? "border-white" : "border-black"}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className={`border ${theme === "dark" ? "border-white" : "border-black"} bg-transparent p-2 outline-none hover:ring-4`}
              placeholder="👌"
              value={searchParams.get("value") || ""}
              onChange={handleOnChange}
            />
          )}
        </div>
      </div>
    </WrapSettingsBox>
  );
}
