import React, { useEffect, useState } from "react";
import JsonArea from "../JsonArea/JsonArea";
import { useWebhook } from "../../hooks/useWebhook";
import { Tabs, Text } from "@mantine/core";

export default function Webhook() {
  const [activeTab, setActiveTab] = useState(0);
  const { render: { webhook, response } } = useWebhook();

  useEffect(() => {
    if (!response) return;
    if (!response.metadata) setActiveTab(0);
  }, [response]);

  return (
    <Tabs active={activeTab} onTabChange={setActiveTab}>
      <Tabs.Tab label="Webhook"><JsonArea webhook={webhook} /></Tabs.Tab>
      <Tabs.Tab label="Response" disabled={response?.metadata ? false : true}><JsonArea webhook={response} /></Tabs.Tab>
    </Tabs>
  );
}
