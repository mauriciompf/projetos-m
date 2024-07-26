import Button from "../components/Button";
import { useFilterSearchContext } from "../context/FilterSearchContext";

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
  const { searchParams, setSearchParams } = useFilterSearchContext();

  const handleOnClick = () => {
    searchParams.delete(valueOne);
    searchParams.delete(valueTwo);
    if (valueThree) searchParams.delete(valueThree);
    setSearchParams(searchParams);
  };

  return (
    searchParams.has(valueOne) &&
    searchParams.has(valueTwo) && (
      <div className="text-right">
        <Button
          onClick={handleOnClick}
          className="w-min text-base italic opacity-70 ring-transparent hover:underline focus:underline"
        >
          Resetar
        </Button>
      </div>
    )
  );
}
