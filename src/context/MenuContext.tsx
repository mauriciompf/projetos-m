import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";
import useCustomHookContext from "../customHooks/useCustomHookContext";

type MenuContextProps = {
  children: React.ReactNode;
};

type MenuContextValues = {
  isOpenMenu: boolean;
  handleToggleMenu: () => void;
};

const MenuContext = createContext<MenuContextValues | null>(null);

function MenuContextProvider({ children }: MenuContextProps) {
  const [isOpenMenu, setIsOpenMenu] = useLocalStorage({
    key: "isOpenMenu",
    initialState: true,
  });

  const handleToggleMenu = () => setIsOpenMenu(!isOpenMenu);

  return (
    <MenuContext.Provider value={{ isOpenMenu, handleToggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

const useMenuContext = () =>
  useCustomHookContext(MenuContext, "useMenuContext", "MenuContextProvider");

export { MenuContextProvider, useMenuContext };
