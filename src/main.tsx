import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { MenuContextProvider } from "./context/MenuContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </MenuContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
