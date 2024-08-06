import { useEffect, useState } from "react";
import { useMenuContext } from "../context/MenuContext";

const useElementVisibility = () => {
  const { isOpenMenu } = useMenuContext();
  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    if (isOpenMenu) {
      const timer = setTimeout(() => setElementVisible(true), 150);
      return () => clearTimeout(timer);
    }

    setElementVisible(false);
  }, [isOpenMenu]);

  return { elementVisible };
};

export { useElementVisibility };
