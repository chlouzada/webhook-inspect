import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nagivation from "../components/Navigation";
import Webhook from "../components/Webhook";

import Pusher from 'pusher-js';
import { useCollections } from "@/contexts/CollectionsContext";
import usePusher from "@/hooks/usePusher";

const Home: NextPage = () => {
  const { collection } = useCollections();

  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      // asideOffsetBreakpoint="sm"
      fixed
      navbar={<Nagivation opened={opened} setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Webhook />
    </AppShell>
  );
};

export default Home;
