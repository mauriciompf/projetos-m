import Button from "../components/Button";
import { useTableContext } from "../context/TableContext";
import { useThemeContext } from "../context/ThemeContext";

export default function ResetParams({ params }: { params: string[] }) {
  const { searchParams, setSearchParams } = useTableContext();
  const { theme } = useThemeContext();

  const resetParams = () => {
    params.forEach((param) => {
      searchParams.delete(param);
    });
    setSearchParams(new URLSearchParams(searchParams));
  };

  const shouldRender = params.some((param) => searchParams.has(param)); // At least one parameter is present in searchParams

  return (
    shouldRender && (
      <div className="text-right">
        <Button
          onClick={resetParams}
          className={`${theme === "light" ? "hover:bg-[#282A2D] hover:text-columbia focus:bg-[#282A2D] focus:text-columbia" : "hover:bg-columbia hover:text-jet focus:bg-columbia focus:text-jet"} my-2 w-min rounded-2xl border border-gray-300 text-base italic ring-transparent`}
        >
          Resetar
          <span className="not-italic">⚠️</span>
        </Button>
      </div>
    )
  );
}
