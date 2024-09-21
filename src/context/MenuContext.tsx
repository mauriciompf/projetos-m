import { createContext } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";
import useCustomHookContext from "../customHooks/useCustomHookContext";

const MenuContext = createContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
} | null>(null);

export default function MenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useLocalStorage<boolean>({
    key: "isMenuOpen",
    initialState: true,
  });

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

const useMenuContext = () =>
  useCustomHookContext(MenuContext, "useMenuContext", "MenuContextProvider");

export { useMenuContext };
