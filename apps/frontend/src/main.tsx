import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import {
  CollectionsContextProvider,
  AuthContextProvider,
  WebhooksContextProvider,
} from "./contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

import "./main.css";

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use(
  (config) => {
    if (!config.headers?.Authorization) {
      const token = localStorage.getItem(
        import.meta.env.VITE_LS_PREFIX + "accessToken"
      );

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ModalsProvider>
          <NotificationsProvider>
            <AuthContextProvider>
              <CollectionsContextProvider>
                <WebhooksContextProvider>
                  <App />
                </WebhooksContextProvider>
              </CollectionsContextProvider>
            </AuthContextProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
