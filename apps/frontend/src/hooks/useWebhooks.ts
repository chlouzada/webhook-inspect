import { useContext } from "react";
import { WebhooksContext } from "../contexts/WebhooksContext";

export function useWebhooks() {
  return useContext(WebhooksContext);
}
