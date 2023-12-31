import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { OrganizationProvider } from "@/context/OrgContext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrganizationProvider>
          <App />
        </OrganizationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
