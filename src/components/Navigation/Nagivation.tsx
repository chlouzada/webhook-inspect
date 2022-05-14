import { Divider, Navbar, Text, ScrollArea } from '@mantine/core'
import moment from 'moment';
import React from 'react'
import { useWebhook } from '../../hooks/useWebhook'

export default function Nagivation({ opened }: { opened: boolean }) {
  const { webhooks, collection, render: { change } } = useWebhook();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section><Text className="text-center">{collection} </Text></Navbar.Section>
      <Divider my="sm" />
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <ul>
          {webhooks?.map((webhook, index) => (
            <li
              key={index}
              className="mb-2 p-4 flex flex-row border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
              onClick={() => change(webhook.key)}
            >
              <p className="text-sm">{webhook.key}</p>
              <span>{moment(webhook.value.createdAt).format("HH:mm:ss")}</span>
            </li>
          ))}
        </ul>
      </Navbar.Section>
    </Navbar >
  )
}
