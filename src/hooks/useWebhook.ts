import { useContext } from "react";
import { WebhookContext } from "../contexts/WebhookContext";

export function useWebhook() {
  return useContext(WebhookContext);
}
