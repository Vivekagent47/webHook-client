import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";
import "@/index.css";
import { AuthProvider } from "./context/AuthContext";
import { OrganizationProvider } from "./context/OrgContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <OrganizationProvider>
        <App />
      </OrganizationProvider>
    </AuthProvider>
  </React.StrictMode>,
);
