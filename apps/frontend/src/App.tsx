import { useState } from "react";
import { AppShell } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import Header from "./components/Header";
import Nagivation from "./components/Navigation";
import { Webhook } from "./components/Webhook";

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Nagivation opened={opened} setOpened={setOpened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Webhook />
    </AppShell>
  );
}
