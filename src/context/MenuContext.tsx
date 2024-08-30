import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";
import useCustomHookContext from "../customHooks/useCustomHookContext";

type MenuContextValues = {
  isOpenMenu: boolean;
  handleToggleMenu: () => void;
};

const MenuContext = createContext<MenuContextValues | null>(null);

export default function MenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenMenu, setIsOpenMenu] = useLocalStorage<boolean>({
    key: "isOpenMenu",
    initialState: true,
  });

  const handleToggleMenu = () => setIsOpenMenu((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isOpenMenu, handleToggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

const useMenuContext = () =>
  useCustomHookContext(MenuContext, "useMenuContext", "MenuContextProvider");

export { useMenuContext };
