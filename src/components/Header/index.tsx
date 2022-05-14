import React from "react";
import { Burger, Button, Header as MantineHeader, MediaQuery, useMantineTheme } from "@mantine/core";
import logo from "../../../images/json_logo.svg";
import { showNotification } from "@mantine/notifications";

function Header({ opened, setOpened }: { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
  const theme = useMantineTheme();
  const handleConfigureBtn = () => { showNotification({ title: 'Configure', message: 'Not implemented yet' }) };
  return (
    <MantineHeader height={64} className="p-2 px-4 flex justify-between">
      <div className='flex items-center h-full'>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.dark[8]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex items-center gap-2 md:gap-5">
          <Button variant="subtle" color="dark" onClick={handleConfigureBtn}>Configure</Button>
        </div>
      </div>
    </MantineHeader>
  );
}

export default Header;
