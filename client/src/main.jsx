import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProSidebarProvider } from "react-pro-sidebar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
      <p className="copyrights">RaSor Software Solutions</p>
    </ProSidebarProvider>
  </React.StrictMode>
);
