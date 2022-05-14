import React, { useEffect, useState } from "react";
import JsonArea from "../JsonArea";
import { useWebhook } from "../../hooks/useWebhook";
import { Tabs, Text } from "@mantine/core";

export default function Webhook() {
  const [activeTab, setActiveTab] = useState(0);
  const { render: { webhook, response } } = useWebhook();

  useEffect(() => {
    if (!response?.metadata) setActiveTab(0);
  }, [response]);

  return (
    <Tabs active={activeTab} onTabChange={setActiveTab} className="overflow-auto">
      <Tabs.Tab label="Webhook"><JsonArea webhook={webhook} /></Tabs.Tab>
      <Tabs.Tab label="Response" disabled={response?.metadata ? false : true}><JsonArea webhook={response} /></Tabs.Tab>
    </Tabs>
  );
}
