import { useContext } from "react";
import { WebhookContext } from "../context/WebhookContext";

export function useWebhook() {
  return useContext(WebhookContext);
}
