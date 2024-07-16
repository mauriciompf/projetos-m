import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetch = (url: string, queryKey: string, arr?: string) => {
  const myQuery = async () => {
    try {
      const { data } = await axios.get(url);
      if (arr) return data[arr];
      return data;
    } catch (error) {
      throw new Error(`Fetch data failed: ${error}`);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: myQuery,
  });

  return { data, isLoading, isError };
};

export default useFetch;
