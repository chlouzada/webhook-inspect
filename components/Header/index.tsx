import React from "react";
import {
  Burger,
  Button,
  Header as MantineHeader,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";

function Header({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();

  // const openModalCollectionUpdate = () =>
  //   modals.openConfirmModal({
  //     title: "Please confirm your action",
  //     children: (
  //       <Text size="sm">
  //         This action is so important that you are required to confirm it with a
  //         modal. Please click one of these buttons to proceed.
  //       </Text>
  //     ),
  //     labels: { confirm: "Confirm", cancel: "Cancel" },
  //     onCancel: () => console.log(collection?.name),
  //     onConfirm: () => console.log("Confirmed"),
  //   });

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
            onClick={() => console.log('click')}
          >
            Configure
          </Button>
        </div>
      </div>
    </MantineHeader>
  );
}

export default Header;
