import { injectable } from "tsyringe";
import CollectionsRepository from "../../../repositories/collections.repository";

@injectable()
export default class FindCollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}
  async execute({
    userId,
    filters,
    skip,
    limit,
  }: {
    userId: string;
    filters: any;
    skip: number;
    limit: number;
  }) {
    console.log(filters);
    return await this.collectionsRepository.find({
      filters: {
        ...filters,
        userRef: userId,
      },
      skip,
      limit,
    });
  }
}
