import { useContext } from "react";
import { ContextIsOpenMenu } from "../context/ContextIsOpenMenu";

const useIsOpenMenu = () => {
  const context = useContext(ContextIsOpenMenu);

  if (!context) {
    throw new Error(
      "Failed to context provider... Verify the provider component.",
    );
  }

  return context;
};

export default useIsOpenMenu;
