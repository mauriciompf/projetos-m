import { useEffect, useState } from "react";
import { useMenuContext } from "../context/MenuContext";

const useElementVisibility = () => {
  const { isMenuOpen } = useMenuContext();
  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const timeout = setTimeout(() => setElementVisible(true), 150);
      return () => clearTimeout(timeout);
    }

    setElementVisible(false);
  }, [isMenuOpen]);

  return { elementVisible };
};

export { useElementVisibility };
