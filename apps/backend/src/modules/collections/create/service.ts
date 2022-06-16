import { injectable } from "tsyringe";
import CollectionsRepository from "../../../repositories/collections.repository";
import UsersRepository from "../../../repositories/users.repository";

@injectable()
export default class CreateCollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly usersRepository: UsersRepository
  ) {}
  async execute({ name, userId }: { name?: string; userId: string }) {
    const collection = await this.collectionsRepository.create({
      name,
      userId,
    });
    if (userId)
      this.usersRepository.pushCollection({
        collectionId: collection.id,
        userId,
      });
  }
}
