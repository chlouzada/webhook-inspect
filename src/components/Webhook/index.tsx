import React, { useEffect, useState } from "react";
import JsonArea from "@/components/JsonArea";
import { Tabs, Text } from "@mantine/core";
import { useWebhooks } from "@/contexts/WebhooksContext";

export default function Webhook() {
  const [activeTab, setActiveTab] = useState(0);
  const { render } = useWebhooks();

  useEffect(() => {
    if (!render?.response) setActiveTab(0);
  }, [render]);

  return (
    <Tabs
      active={activeTab}
      onTabChange={setActiveTab}
      className="overflow-auto"
    >
      <Tabs.Tab label="Webhook">
        <JsonArea json={render?.webhook?.data.body} />
      </Tabs.Tab>
      <Tabs.Tab
        label="Response"
        // TODO: disabled={render?.webhook?.response ? false : true}
        disabled={true}
      >
        {/* TODO: <JsonArea json={render?.webhook?.response?.body} /> */}
      </Tabs.Tab>
    </Tabs>
  );
}
