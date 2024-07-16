import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextThemeProvider } from "../src/context/ContextThemeProvider.tsx";
import { ContextIsOpenMenuProvider } from "./context/ContextIsOpenMenu.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToggleContextProvider } from "./context/ToggleContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextIsOpenMenuProvider>
        <ToggleContextProvider>
          <ContextThemeProvider>
            <App />
          </ContextThemeProvider>
        </ToggleContextProvider>
      </ContextIsOpenMenuProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
