import WrapOutlet from "../components/WrapOutlet";
import FilterTable from "../components/Filter/FilterTable";
import FilterSettings from "../components/Filter/FilterSettings";
import useFetch from "../customHooks/useFetch";
import { FilterSearchProvider } from "../context/FilterSearchContext";
import { ToggleContextProvider } from "../context/ToggleContext";
import Loading from "../components/Loading";

const tableLength = 50;

export default function Filter() {
  const { data: usersData, isError } = useFetch(
    `https://dummyjson.com/users?limit=${tableLength}`,
    "users",
    "users",
  );

  return (
    <div className="selection:bg-blue-400">
      <FilterSearchProvider>
        <ToggleContextProvider>
          <WrapOutlet projectName="Ordenação e Filtro">
            <Loading />
            {isError && <p>Error...</p>}
            {usersData && (
              <>
                <section className="relative mx-auto my-10 w-[min(950px,_100%)] text-lg">
                  <FilterSettings />
                  <FilterTable usersData={usersData} />
                </section>
              </>
            )}
          </WrapOutlet>
        </ToggleContextProvider>
      </FilterSearchProvider>
    </div>
  );
}

export { tableLength };
