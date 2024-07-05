import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextThemeProvider } from "../src/context/ContextThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextThemeProvider>
      <App />
    </ContextThemeProvider>
  </React.StrictMode>,
);
