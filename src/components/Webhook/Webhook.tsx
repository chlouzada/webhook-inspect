import React, { useState } from "react";
import JsonArea from "../JsonArea/JsonArea";
import { useWebhook } from "../../hooks/useWebhook";
import { Tabs, Text } from "@mantine/core";

export default function Webhook() {
  const [activeTab, setActiveTab] = useState(1);
  const { render: { webhook, response } } = useWebhook();

  return (
    <Tabs active={activeTab} onTabChange={setActiveTab}>
      <Tabs.Tab label="Webhook"><JsonArea webhook={webhook} /></Tabs.Tab>
      <Tabs.Tab label="Response" disabled={response ? false : true}><JsonArea webhook={response} /></Tabs.Tab>
    </Tabs>
  );
}
