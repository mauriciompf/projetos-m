import { useEffect } from "react";
import useFetch from "./useFetch";
import { useTimeGeoContext } from "../context/TimeGeoContext";

const useFetchGeoUrl = () => {
  const { setGeoUrl } = useTimeGeoContext();

  const { data: ipData, isLoading: ipIsLoading } = useFetch(
    "https://api.ipify.org/?format=json",
    "ip",
  ); // Fetch IP address

  useEffect(() => {
    if (!ipIsLoading && ipData) {
      setGeoUrl(`https://get.geojs.io/v1/ip/geo/${ipData.ip}`); // Set URL string endpoint to get the geo location by IP address
    }
  }, [ipIsLoading, ipData]);
};

export default useFetchGeoUrl;
