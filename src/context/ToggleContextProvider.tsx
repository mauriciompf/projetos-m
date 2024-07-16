import { createContext, useState } from "react";

const ToggleContext = createContext<any | null>(null);

function ToggleContextProvider({ children }: any) {
  const [toggleSelectColumn, setToggleSelectColumn] = useState(false);
  const [toggleOrderBy, setToggleOrderBy] = useState(false);

  return (
    <ToggleContext.Provider
      value={{
        toggleSelectColumn,
        setToggleSelectColumn,
        toggleOrderBy,
        setToggleOrderBy,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

export { ToggleContext, ToggleContextProvider };
