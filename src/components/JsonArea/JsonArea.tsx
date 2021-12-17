import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { IWebhook, IWebhookFirebase } from "../Collection/Collection";
import moment from "moment";

export default function JsonArea({
  webhook,
}: {
  webhook: IWebhook | undefined;
}) {
  const ref = useRef(nanoid());

  const [text, setText] = useState([] as any);

  useEffect(() => {
    const textAreaElement = document.getElementById(
      ref.current
    ) as HTMLTextAreaElement;
    if (webhook) {
      const parsed = JSON.stringify(webhook?.metadata, undefined, 4);
      textAreaElement.value = parsed || "no content";

      var newString = parsed.replace(/\n/g, "__$newline__");
      const arr = newString.split("__$newline__");
      setText(arr);
    }
  }, [webhook]);
  return (
    <div className="h-full">
      <p>{moment(webhook?.createdAt).format("HH:mm:ss.SS")}</p>
      <div className="whitespace-pre">         </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            JSON.stringify(webhook?.metadata, undefined, 4)
          );
        }}
      >
        Copiar
      </button>

    <ul>
      {text.map((line: string, index: number) => {
        if((line.indexOf('{') > -1 || line.indexOf('[') > -1) && index > 0 ) {
          return <li className="whitespace-pre flex" key={index}><button className="bg-red-500 w-6"></button>{line}</li>
        }
        return <li className="whitespace-pre" key={index}><button className="bg-red-500 w-6"></button>{line}</li>
      })}
    </ul>
      {text.map((line: string, index: number) => (
        <p key={index} className="whitespace-pre">{line}</p>
      ))}
      <textarea className="w-full h-full" id={ref.current}></textarea>
    </div>
  );
}
