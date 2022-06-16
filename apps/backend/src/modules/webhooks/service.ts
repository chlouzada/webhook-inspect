import { injectable } from "tsyringe";
import CollectionsRepository from "../../repositories/collections.repository";
import WebhooksRepository from "../../repositories/webhooks.repository";

@injectable()
export default class CreateWebhooksService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly webhooksRepository: WebhooksRepository
  ) {}
  async execute({
    collectionName,
    headers,
    body,
    params,
    query,
    method,
  }: {
    collectionName: string;
    headers: any;
    body: any;
    params: any;
    query: any;
    method: string;
  }) {
    const collection = await this.collectionsRepository.getOrCreate(
      collectionName
    );
    const webhook = await this.webhooksRepository.create({
      collectionId: collection.id,
      headers,
      body,
      params,
      query,
      method,
    });
    this.collectionsRepository.pushWebhook({
      collectionId: collection.id,
      webhookId: webhook.id,
    });
    return webhook;
  }
}
