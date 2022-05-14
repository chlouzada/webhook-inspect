import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthContextProvider } from "./context/AuthContext";
import { WebhookContextProvider } from "./context/WebhookContext";

import "./main.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WebhookContextProvider>
        <MantineProvider>
          <ModalsProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </WebhookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
