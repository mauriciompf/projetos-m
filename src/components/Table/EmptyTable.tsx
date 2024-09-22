import { useTableContext } from "../../context/TableContext";

export default function EmptyTable() {
  const { filtedTableLength } = useTableContext();
  return (
    filtedTableLength === 0 && (
      <div className="mt-10 grid select-none place-items-center gap-4 text-2xl">
        <p>
          <em>-- Sem valores --</em>
        </p>
        <p>(ノ#-_-)ノ ミ┴┴</p>
      </div>
    )
  );
}
