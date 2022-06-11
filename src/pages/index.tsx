import { trpc } from "@/utils/trpc";
import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/Header";
import Nagivation from "../components/Navigation";
import Webhook from "../components/Webhook";

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const hello = trpc.useQuery(['hello', {text: 'carlos'}]);
  if(hello.data) console.log(hello.data);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Nagivation opened={opened} setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Webhook />
    </AppShell>
  );
};

export default Home;
