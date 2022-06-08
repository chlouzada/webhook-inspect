import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

export default function JsonArea({ json }: { json?: object }) {
  const [webhookArray, setWebhookArray] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<{ start: number; end: number }[]>(
    []
  );
  const [parsed, setParsed] = useState("");

  useEffect(() => {
    if (!json) return;
    const stringifyData = JSON.stringify(json, undefined, 4);
    const lines = stringifyData?.split("\n");
    setWebhookArray(lines);
    setParsed(stringifyData || "");
  }, [json]);

  function handler(btn: EventTarget & HTMLButtonElement) {
    let start = btn.id.split("-")[1] as unknown as number;
    let end = webhookArray.length;

    if (btn.classList.contains("collapsed")) {
      handlerExpand();
    } else {
      handlerCollapse();
    }

    function handlerCollapse() {
      const stack: string[] = [];
      for (let i = start; i < webhookArray.length; i++) {
        const line = webhookArray[i];
        if (line.indexOf("{") > -1) {
          stack.push("{");
        } else if (line.indexOf("[") > -1) {
          stack.push("[");
        } else if (line.indexOf("}") > -1) {
          stack.pop();
        } else if (line.indexOf("]") > -1) {
          stack.pop();
        }
        if (stack.length === 0) {
          end = i;
          break;
        }
      }
      collapse(++start, end);
      btn.classList.add("collapsed");

      function collapse(start: number, end: number) {
        for (let i = start as unknown as number; i < end; i++) {
          document.getElementById("li-" + i)?.classList.add("hidden");
        }
        const newCollapsed = [...collapsed];
        newCollapsed.push({ start, end });
        console.log(newCollapsed);
        setCollapsed(newCollapsed);
      }
    }

    function handlerExpand() {
      expand(++start);
      btn.classList.remove("collapsed");

      function expand(start: number) {
        for (const el of collapsed)
          if (el.start === start) {
            const end: number = el.end;
            for (let i = start; i < end; i++)
              document.getElementById("li-" + i)?.classList.remove("hidden");
            break;
          }
      }
    }
  }

  return (
    <div>
      {/* <p>{moment(webhook?.createdAt).format("HH:mm:ss.SS")}</p> */}
      <div className="whitespace-pre"> </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(parsed);
        }}
      >
        Copiar
      </button>

      <ul>
        {webhookArray?.map((line: string, index: number) => {
          if ((line.indexOf("{") > -1 || line.indexOf("[") > -1) && index > 0) {
            return (
              <li
                id={`li-${index}`}
                className="whitespace-pre flex"
                key={`li-${index}`}
              >
                <button
                  id={`btn-${index}`}
                  key={`btn-${index}`}
                  className="bg-red-500 w-6"
                  onClick={(e) => handler(e.currentTarget)}
                ></button>
                {line}
              </li>
            );
          }
          return (
            <li
              id={`li-${index}`}
              className="whitespace-pre"
              key={`li-${index}`}
            >
              <button key={`btn-${index}`} className="bg-red-500 w-6"></button>
              {line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
