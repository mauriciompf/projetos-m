import axios from "axios";
import WrapOutlet from "../components/WrapOutlet";
import { useQuery } from "@tanstack/react-query";
import useThemeContext from "../customHooks/useThemeContext";

const Filter = () => {
  const { theme } = useThemeContext();

  const queryUsers = async () => {
    const { data } = await axios.get("https://dummyjson.com/users");
    return data.users;
  };
  const myQuery = useQuery({
    queryKey: ["users"],
    queryFn: queryUsers,
  });

  const { data: usersData, isLoading, isError } = myQuery;

  const getSexNameTranslated = (sex) =>
    sex === "female" ? "Feminino" : "Masculino";

  return (
    <WrapOutlet projectName="Filter">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isLoading && !isError && usersData && <p>Error...</p> && (
        <section className="my-10 text-lg">
          <table className="mx-auto w-[80%] table-auto rounded-lg">
            <thead>
              <tr className={`${theme === "dark" && "bg-slate-700"} `}>
                <th className="ring-1 ring-black">ID</th>
                <th className="p-2 ring-1 ring-black">Nome</th>
                <th className="p-2 ring-1 ring-black">Idade</th>
                <th className="p-2 ring-1 ring-black">Sexo</th>
                <th className="p-2 ring-1 ring-black">Email</th>
                <th className="p-2 ring-1 ring-black">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr
                  className={`${theme === "dark" ? ": odd:bg-slate-500 even:bg-black" : "odd:bg-white even:bg-gray-200"}`}
                  key={user.id}
                >
                  <td className="00 text-center ring-1 ring-black">
                    {user.id}
                  </td>
                  <td className="p-2 ring-1 ring-black">{user.firstName}</td>
                  <td className="p-2 text-center ring-1 ring-black">
                    {user.age}
                  </td>
                  <td className="p-2 ring-1 ring-black">
                    {getSexNameTranslated(user.gender)}
                  </td>
                  <td className="p-2 ring-1 ring-black">{user.email}</td>
                  <td className="p-2 ring-1 ring-black">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </WrapOutlet>
  );
};

export default Filter;
