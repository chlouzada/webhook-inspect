import { Divider, Navbar, Text, ScrollArea } from '@mantine/core'
import moment from 'moment';
import React from 'react'
import { useWebhook } from '../../hooks/useWebhook'

export default function Nagivation({ opened, setOpened }: { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { webhooks, collection, render: { change } } = useWebhook();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section className="w-full"><h1 className="font-bold text-center">{collection}</h1></Navbar.Section>
      <Navbar.Section><Divider my="sm" /></Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <ul>
          {webhooks?.map((webhook, index) => (
            <li
              key={index}
              className="mb-2 p-4 flex flex-col border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
              onClick={() => { opened && setOpened(false); change(webhook.key) }}
            >
              <p className="text-sm">{webhook.key}</p>
              <p className="text-sm">{moment(webhook.value.createdAt).format("HH:mm:ss")}</p>
            </li>
          ))}
        </ul>
      </Navbar.Section>
    </Navbar >
  )
}
