import { trpc } from "@/utils/trpc";
import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import Header from "../components/Header";
import Nagivation from "../components/Navigation";
import Webhook from "../components/Webhook";
import { CollectionsContextProvider } from "@/contexts/CollectionsContext";
import { WebhooksContextProvider } from "@/contexts/WebhooksContext";
import { UserContextProvider } from "@/contexts/UserContext";
import { CookiesProvider } from "react-cookie";

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <CookiesProvider>
      <UserContextProvider>
        <AppShell
          navbarOffsetBreakpoint="sm"
          // asideOffsetBreakpoint="sm"
          fixed
          navbar={<Nagivation opened={opened} setOpened={setOpened} />}
          header={<Header opened={opened} setOpened={setOpened} />}
        >
          <Webhook />
        </AppShell>
      </UserContextProvider>
    </CookiesProvider>
  );
};

export default Home;