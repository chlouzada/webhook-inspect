import WebhooksModel from "../models/webhooks.model";

export default class WebhooksRepository {
  async create({
    collectionId,
    headers,
    body,
    params,
    query,
    method,
  }: {
    collectionId: string;
    headers: any;
    body: any;
    params: any;
    query: any;
    method: string;
  }) {
    return await WebhooksModel.create({
      data: {
        body,
        headers,
        params,
        query,
        method,
      },
      collectionRef: collectionId,
    });
  }
}
