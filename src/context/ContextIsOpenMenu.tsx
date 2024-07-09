import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

type ContextIsOpenMenuProviderProps = {
  children: React.ReactNode;
};

type ContextIsOpenMenuValues = {
  isOpenMenu: boolean;
  handleToggleMenu: () => void;
};

const ContextIsOpenMenu = createContext<ContextIsOpenMenuValues | null>(null);

function ContextIsOpenMenuProvider({
  children,
}: ContextIsOpenMenuProviderProps) {
  const [isOpenMenu, setIsOpenMenu] = useLocalStorage({
    key: "isOpenMenu",
    initialState: true,
  });

  const handleToggleMenu = () => setIsOpenMenu(!isOpenMenu);

  return (
    <ContextIsOpenMenu.Provider value={{ isOpenMenu, handleToggleMenu }}>
      {children}
    </ContextIsOpenMenu.Provider>
  );
}

export { ContextIsOpenMenuProvider, ContextIsOpenMenu };
