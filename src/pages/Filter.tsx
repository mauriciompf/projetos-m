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
    <div className="overflow-hidden selection:bg-blue-400">
      <FilterSearchProvider>
        <ToggleContextProvider>
          <WrapOutlet projectName="Ordenação e Filtro">
            {isError && <p>Error...</p>}

            <section className="mx-auto my-0 w-[min(950px,_100%)] text-lg md:my-10">
              <Loading />
              {usersData && (
                <>
                  <FilterSettings />
                  <FilterTable usersData={usersData} />
                </>
              )}
            </section>
          </WrapOutlet>
        </ToggleContextProvider>
      </FilterSearchProvider>
    </div>
  );
}

export { tableLength };
