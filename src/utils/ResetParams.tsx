import Button from "../components/Button";
import { useTableParamsContext } from "../context/TableParamsContext";
import { useThemeContext } from "../context/ThemeContext";

type ResetParamsProps = {
  valueOne: string;
  valueTwo: string;
  valueThree?: string;
};

export default function ResetParams({
  valueOne,
  valueTwo,
  valueThree,
}: ResetParamsProps) {
  const { searchParams, setSearchParams } = useTableParamsContext();
  const { theme } = useThemeContext();

  // Delete specified search params and update context
  const handleOnClick = () => {
    searchParams.delete(valueOne);
    searchParams.delete(valueTwo);
    if (valueThree) {
      searchParams.delete(valueThree);
    }
    setSearchParams(new URLSearchParams(searchParams));
  };

  return (
    searchParams.has(valueOne) &&
    searchParams.has(valueTwo) && (
      <div className="text-right">
        <Button
          onClick={handleOnClick}
          className={`${theme === "light" ? "hover:bg-[#282A2D] hover:text-columbia focus:bg-[#282A2D] focus:text-columbia" : "hover:bg-columbia hover:text-jet focus:bg-columbia focus:text-jet"} my-2 w-min rounded-2xl border border-gray-300 text-base italic ring-transparent`}
        >
          Resetar
          <span className="not-italic">⚠️</span>
        </Button>
      </div>
    )
  );
}
