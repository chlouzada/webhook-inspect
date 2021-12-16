import { nanoid } from "nanoid";
import React, { useEffect, useRef } from "react";
import { IWebhook, IWebhookFirebase } from "../Collection/Collection";
import moment from "moment";

export default function JsonArea({
  webhook,
}: {
  webhook: IWebhook | undefined;
}) {
  const ref = useRef(nanoid());
  const textAreaElement = document.getElementById(
    ref.current
  ) as HTMLTextAreaElement;

  useEffect(() => {
    if (webhook) {
      const parsed = JSON.stringify(webhook?.metadata, undefined, 4);
      textAreaElement.value = parsed || "no content";
    }
  }, [webhook]);
  return (
    <div className="bg-red-200 h-full">
      <p>{moment(webhook?.createdAt).format("HH:mm:ss.SS")}</p>
      <textarea className="w-full h-full" id={ref.current}></textarea>
    </div>
  );
}
