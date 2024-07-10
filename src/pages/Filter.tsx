import axios from "axios";
import WrapOutlet from "../components/WrapOutlet";
import { useQuery } from "@tanstack/react-query";
import FilterTable from "../components/Filter/FilterTable";
import FilterSettings from "../components/Filter/FilterSettings";
import { useState } from "react";

const Filter = () => {
  const [orderBy, setOrderBy] = useState("");
  const [selectColumn, setSelectColumn] = useState("");

  const queryUsers = async () => {
    const { data } = await axios.get("https://dummyjson.com/users");
    return data.users;
  };
  const myQuery = useQuery({
    queryKey: ["users"],
    queryFn: queryUsers,
  });

  const { data: usersData, isLoading, isError } = myQuery;

  return (
    <WrapOutlet projectName="Filtro">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isLoading && !isError && usersData && <p>Error...</p> && (
        <>
          <section className="my-10 text-lg">
            <FilterSettings
              selectColumn={selectColumn}
              setSelectColumn={setSelectColumn}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
            <FilterTable
              selectColumn={selectColumn}
              orderBy={orderBy}
              usersData={usersData}
            />
          </section>
        </>
      )}
    </WrapOutlet>
  );
};

export default Filter;
