import { useTableParamsContext } from "../../context/TableParamsContext";
import { tableLength } from "../../utils/constants";

export default function ResultInfo() {
  const { filtedTableLength } = useTableParamsContext();

  return (
    <p className="text-right">
      <em>
        Exibindo {filtedTableLength} de {tableLength} Resultados
      </em>
    </p>
  );
}
