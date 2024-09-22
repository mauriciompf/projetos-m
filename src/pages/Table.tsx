import WrapOutlet from "../components/WrapOutlet";
import Loading from "../components/Loading";
import projectList from "../utils/projectList";
import TableSettings from "../components/Table/TableSettings";
import TableToggleProvider from "../context/TableToggleContext";
import UsersTable from "../components/Table/UsersTable";
import { useTableContext } from "../context/TableContext";

export default function Table() {
  const { isLoading } = useTableContext();

  return (
    <div className="selection:bg-blue-400">
      <TableToggleProvider>
        <WrapOutlet projectName={projectList[0].label}>
          <section className="relative mx-auto my-0 w-[min(950px,_100%)] text-lg md:my-10">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <TableSettings />
                <UsersTable />
              </>
            )}
          </section>
        </WrapOutlet>
      </TableToggleProvider>
    </div>
  );
}
