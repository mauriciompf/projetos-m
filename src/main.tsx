import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextThemeProvider } from "../src/context/ContextThemeProvider.tsx";
import { ContextIsOpenMenuProvider } from "./context/ContextIsOpenMenu.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextIsOpenMenuProvider>
        <ContextThemeProvider>
          <App />
        </ContextThemeProvider>
      </ContextIsOpenMenuProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
