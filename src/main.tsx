import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { MenuContextProvider } from "./context/MenuContext.tsx";
// import { ToggleContextProvider } from "./context/ToggleContext.tsx";
// import { FilterSearchProvider } from "./context/FilterSearchContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        {/* <ToggleContextProvider> */}
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
        {/* </ToggleContextProvider> */}
      </MenuContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
