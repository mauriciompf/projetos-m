import { useEffect, useState } from "react";

const useLoadingTimer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return { isLoading };
};

export default useLoadingTimer;
