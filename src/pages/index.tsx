import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Nagivation from "../components/Navigation";
import Webhook from "../components/Webhook";

import Pusher from 'pusher-js';
import { useCollections } from "@/contexts/CollectionsContext";

const Home: NextPage = () => {

  const { collection } = useCollections();

  const pusher = new Pusher('1cd4614f4c0a77332cfe', {
    cluster: 'us2'
  });

  useEffect(() => {
    if (!collection) return

    const channel = pusher.subscribe('collection');
    channel.bind('webhook', function (data: any) {
      console.log('comming from collection', data);
    });

    return () => {
      channel.unbind('webhook');
      channel.unsubscribe();
    };
  }, [collection]);

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
