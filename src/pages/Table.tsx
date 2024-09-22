import WrapOutlet from "../components/WrapOutlet";
import FilterTable from "../components/Table/FilterTable";
import useFetch from "../customHooks/useFetch";
import Loading from "../components/Loading";
import projectList from "../utils/projectList";
import { tableLength } from "../utils/constants";
import TableSettings from "../components/Table/TableSettings";
import TableParamsProvider from "../context/TableParamsContext";
import TableToggleProvider from "../context/TableToggleContext";

export default function Table() {
  const {
    data: usersData,
    isLoading,
    isError,
  } = useFetch(
    `https://dummyjson.com/users?limit=${tableLength}`,
    "users",
    "users",
  );

  if (isError) console.error(isError);

  return (
    <div className="selection:bg-blue-400">
      <TableParamsProvider>
        <TableToggleProvider>
          <WrapOutlet projectName={projectList[0].label}>
            <section className="relative mx-auto my-0 w-[min(950px,_100%)] text-lg md:my-10">
              {isLoading ? (
                <Loading />
              ) : (
                usersData && (
                  <>
                    <TableSettings />
                    <FilterTable usersData={usersData} />
                  </>
                )
              )}
            </section>
          </WrapOutlet>
        </TableToggleProvider>
      </TableParamsProvider>
    </div>
  );
}
