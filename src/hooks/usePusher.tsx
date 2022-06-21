import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { Collection, Webhook } from '@prisma/client';

export default function usePusher(collection?: Collection) {
  const [receivedWebhook, setReceivedWebhook] = useState<Webhook>()

  const remove = () => setReceivedWebhook(undefined)

  const pusher = new Pusher('1cd4614f4c0a77332cfe', {
    cluster: 'us2'
  });

  useEffect(() => {
    if (!collection) return

    // FIXME: make subscription work with collection ObjectId
    const channel = pusher.subscribe(collection.name);
    channel.bind("new-webhook", (data: Webhook) => {
      setReceivedWebhook(data)
      console.log(data);
    });

    return () => {
      channel.unbind('collection');
      channel.unsubscribe();
    };
  }, [collection]);

  return { remove, received: receivedWebhook }
}
