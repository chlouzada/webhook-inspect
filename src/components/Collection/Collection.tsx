import React from "react";
import JsonArea from "../JsonArea/JsonArea";
import { useWebhook } from "../../hooks/useWebhook";

export interface IWebhookFirebase {
  key: string;
  value: IWebhook;
}

export interface IWebhook {
  createdAt: string;
  metadata: any;
  response?: IWebhook;
}

export default function Collection() {
  const { render: { webhook, response }, collection } = useWebhook();

  return (
    <div>
      <div className="flex container mx-auto">
        <section className="">
          <div className="">
            <h1>Collection Name: {collection}</h1>
            <p>Redirect:</p>
          </div>
          <JsonArea webhook={webhook} />
          <JsonArea webhook={response} />
        </section>
      </div>
    </div>
  );
}
