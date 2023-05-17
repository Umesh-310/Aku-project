import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider, Text } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {" "}
      <BrowserRouter>
        <UserProvider>
          {" "}
          <App />
        </UserProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
