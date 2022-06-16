import React from "react";
import {
  Burger,
  Button,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import logo from "../../../images/json_logo.svg";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";
import { useCollections } from "../../hooks";

function Header({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modals = useModals();
  const theme = useMantineTheme();
  const { collection } = useCollections();

  const openModalCollectionUpdate = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log(collection?.name),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <MantineHeader height={64} className="p-2 px-4 flex justify-between">
      <div className="flex items-center h-full">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.dark[8]}
            mr="xl"
          />
        </MediaQuery>
        <div className="flex items-center gap-2 md:gap-5">
          <Button
            variant="subtle"
            color="dark"
            onClick={openModalCollectionUpdate}
          >
            Configure
          </Button>
        </div>
      </div>
    </MantineHeader>
  );
}

export default Header;
