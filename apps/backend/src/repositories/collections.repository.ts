import { CollectionsModel } from "../models/collections.model";

export default class CollectionsRepository {
  async create({
    name,
    userId,
  }: {
    name: string | undefined;
    userId: string | undefined;
  }) {
    return await CollectionsModel.create({ name, userRef: userId });
  }

  async find({
    filters,
    skip,
    limit,
  }: {
    filters: any;
    skip?: number;
    limit?: number;
  }) {
    return await CollectionsModel.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip || 0)
      .limit(limit || 20)
      .populate("webhooksRef");
  }

  async getOrCreate(collectionName: string) {
    return await CollectionsModel.findOneAndUpdate(
      { name: collectionName },
      { name: collectionName },
      { upsert: true, new: true }
    );
  }

  async pushWebhook({
    collectionId,
    webhookId,
  }: {
    collectionId: string;
    webhookId: string;
  }) {
    return CollectionsModel.findByIdAndUpdate(
      collectionId,
      {
        $push: {
          webhooksRef: webhookId,
        },
      },
      { new: true }
    );
  }
}
