import React, { useEffect } from "react";
import { IWebhookFirebase } from "../Collection/Collection";

export default function JsonArea({
  webhook,
}: {
  webhook: IWebhookFirebase | undefined;
}) {
  useEffect(() => {
    if (webhook) {
      const textAreaElement: HTMLTextAreaElement = document.getElementById(
        "json-area"
      ) as HTMLTextAreaElement;
      console.log("JsonArea", webhook);
      const parsed = JSON.stringify(webhook?.value.metadata, undefined, 4);
      textAreaElement.value = parsed || "no content";
    }
  }, [webhook]);
  return (
    <div>
      <p>{webhook?.value.createdAt}</p>
      <textarea className="w-full h-full" name="" id="json-area"></textarea>
    </div>
  );
}
