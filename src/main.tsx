import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import MenuContextProvider from "./context/MenuContext.tsx";
import EditAlbumProvider from "./pages/EditAlbumContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        <ThemeContextProvider>
          <EditAlbumProvider>
            <App />
          </EditAlbumProvider>
        </ThemeContextProvider>
      </MenuContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
