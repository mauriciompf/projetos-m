import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetch = (url: string, queryKey: string, arr?: string) => {
  const myQuery = async () => {
    try {
      const { data } = await axios.get(url);
      // Return the specific array data if 'arr' is provided, otherwise return the full data
      return arr ? data[arr] : data;
    } catch (error) {
      throw new Error(
        `Fetch data failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: myQuery,
    enabled: !!url, // Ensure that the query only runs if url is a truthy value
  });

  return { data, isLoading, isError };
};

export default useFetch;
