import { AppShell, Navbar, Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import React, { useState } from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Nagivation from "./components/Navigation/Nagivation";
import { AuthContextProvider } from "./context/AuthContext";

import Main from "./pages/Main/Main";

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
      navbar={<Nagivation opened={opened} />}
      header={<Header />}
    >
      <Main />
    </AppShell>
  );
}
