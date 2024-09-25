import { RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import useToggleDropDown from "../../customHooks/useToggleDropDown";
import useClickOutside from "../../customHooks/useClickOutside";
import useFilterHandlers from "../../customHooks/useFilterHandlers";
import WrapSettingsBox from "../WrapSettingsBox";
import ResetParams from "./ResetParams";
import ColumnSelector from "./ColumnSelector";
import HeaderControl from "./HeaderControl";
import toCapitalizeCase from "../../utils/toCapitalizeCase";
import Button from "../Button";
import ListItem from "./ListItem";
import { useTableContext } from "../../context/TableContext";

type FilterBoxProps = {
  refFilterBtn: RefObject<HTMLButtonElement>;
  setToggleFilter: (val: boolean) => void;
};

export default function FilterBox({
  refFilterBtn,
  setToggleFilter,
}: FilterBoxProps) {
  const statusLabels = ["É", "Não É"];
  const sexLabels = ["Masculino", "Feminino"];
  const refFilterBox = useRef<HTMLElement | null>(null);
  const { theme } = useThemeContext();
  const { selectColumn } = useToggleDropDown("filter");
  const { searchParams, statusParams } = useTableContext();

  useClickOutside([refFilterBox, refFilterBtn], () => setToggleFilter(false));
  const navigate = useNavigate();

  const {
    statusToggle,
    handleSelectSex,
    handleStatusToggle,
    handleStatusSelect,
    handleOnChange,
  } = useFilterHandlers();

  // Redirect to the homepage when the back button is clicked
  window.onpopstate = () => {
    navigate("/");
  };

  return (
    <WrapSettingsBox
      refElem={refFilterBox}
      className={`-left-[120px] grid md:left-0 ${searchParams.has("filter") && searchParams.has("status") && "pt-0"}`}
    >
      <ResetParams params={["filter", "status", "value"]} />

      <div className="flex flex-col gap-2 md:flex-row">
        <ColumnSelector keyName="filter" restrictedList={["Data de Nasc."]} />

        {selectColumn !== "sexo" && (
          <div>
            <HeaderControl
              headerLabel={
                (statusParams.has("status") &&
                  toCapitalizeCase(
                    decodeURIComponent(statusParams.get("status")!),
                  )) ||
                "Status"
              }
              className="w-[6.25rem]"
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
                  className={`border p-2 ${theme === "dark" ? "border-columbia" : "border-jet"}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className={`border ${theme === "dark" ? "border-columbia" : "border-jet"} w-[10rem] bg-transparent p-2 outline-none placeholder:opacity-50 hover:ring-4`}
              placeholder="👀"
              maxLength={27}
              value={
                searchParams.has("value")
                  ? decodeURIComponent(searchParams.get("value")!)
                  : ""
              }
              onChange={handleOnChange}
            />
          )}
        </div>
      </div>
    </WrapSettingsBox>
  );
}
