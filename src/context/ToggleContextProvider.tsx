import { createContext, useContext, useState } from "react";

const ToggleContext = createContext<any | null>(null);

function ToggleContextProvider({ children }: any) {
  const [orderBy, setOrderBy] = useState("");
  const [selectColumn, setSelectColumn] = useState("");

  return (
    <ToggleContext.Provider
      value={{
        orderBy,
        setOrderBy,
        selectColumn,
        setSelectColumn,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

const useToggleContext = () => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error(
      "useToggleContext must be used within a ToggleProvider in root",
    );
  }

  return context;
};

export { ToggleContext, ToggleContextProvider, useToggleContext };
