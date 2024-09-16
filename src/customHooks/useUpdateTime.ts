import { useEffect } from "react";
import { useTimeGeoContext } from "../context/TimeGeoContext";

const useUpdateTime = () => {
  const { setDate } = useTimeGeoContext();

  useEffect(() => {
    const updateTime = setInterval(() => {
      setDate(new Date());
    }, 500);

    return () => clearInterval(updateTime);
  }, []);
};

export default useUpdateTime;
