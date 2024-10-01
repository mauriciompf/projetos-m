import { useTableContext } from "../../context/TableContext";
import { tableLength } from "../../utils/constants";

export default function ResultInfo() {
  const { filtedTableLength } = useTableContext();

  return (
    <p className="text-right">
      <em>
        Exibindo {filtedTableLength} de {tableLength} resultados
      </em>
    </p>
  );
}
