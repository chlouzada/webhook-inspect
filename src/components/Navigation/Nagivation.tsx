import { Navbar, Text } from '@mantine/core'
import moment from 'moment';
import React from 'react'
import { useWebhook } from '../../hooks/useWebhook'

export default function Nagivation({ opened }: { opened: boolean }) {
  const { webhooks } = useWebhook();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      {webhooks?.map((webhook, index) => (
        <li
          key={index}
          className="mb-2 p-4 flex flex-row border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"

        >
          <button>
            <p className="text-sm">{webhook.key}</p>
            <span>{moment(webhook.value.createdAt).format("HH:mm:ss")}</span>
          </button>
        </li>
      ))}
    </Navbar>
  )
}
