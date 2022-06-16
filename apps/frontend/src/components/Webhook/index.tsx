import React, { useEffect, useState } from "react";
import JsonArea from "../JsonArea";
import { useCollections } from "../../hooks/useCollections";
import { Tabs, Text } from "@mantine/core";
import { useWebhooks } from "../../hooks/useWebhooks";

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
        disabled={render?.webhook?.response ? false : true}
      >
        <JsonArea json={render?.webhook?.response?.body} />
      </Tabs.Tab>
    </Tabs>
  );
}
