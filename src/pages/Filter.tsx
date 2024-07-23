import WrapOutlet from "../components/WrapOutlet";
import FilterTable from "../components/Filter/FilterTable";
import FilterSettings from "../components/Filter/FilterSettings";
import useFetch from "../customHooks/useFetch";
import { FilterSearchProvider } from "../context/FilterSearchContext";
import { ToggleContextProvider } from "../context/ToggleContext";

const Filter = () => {
  const {
    data: usersData,
    isLoading,
    isError,
  } = useFetch("https://dummyjson.com/users", "users", "users");

  return (
    <FilterSearchProvider>
      <ToggleContextProvider>
        <WrapOutlet projectName="Ordenação e Filtro">
          {/* #HACK isLoading in all query components */}
          {isLoading && (
            <section className="mt-32 grid place-items-center">
              <img
                src="/InternetSlowdown_Day.gif"
                className="size-32 mix-blend-multiply"
                alt="Loading..."
              />
            </section>
          )}
          {isError && <p>Error...</p>}
          {!isLoading && !isError && usersData && <p>Error...</p> && (
            <>
              <section className="my-10 text-lg">
                <FilterSettings />
                <FilterTable usersData={usersData} />
              </section>
            </>
          )}
        </WrapOutlet>
      </ToggleContextProvider>
    </FilterSearchProvider>
  );
};

export default Filter;
