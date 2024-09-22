import EmptyTable from "./EmptyTable";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function UsersTable() {
  return (
    <>
      <div className="mx-6 max-[1240px]:overflow-x-auto max-md:max-h-[350px] min-[1240px]:mx-0">
        <table className="w-full whitespace-nowrap">
          <TableHead />
          <TableBody />
        </table>
      </div>
      <EmptyTable />
    </>
  );
}
