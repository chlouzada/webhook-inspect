import UsersModel from "../models/users.model";
export default class UsersRepository {
  async create() {
    return await UsersModel.create({});
  }

  async pushCollection({
    userId,
    collectionId,
  }: {
    userId: string;
    collectionId: string;
  }) {
    return await UsersModel.findByIdAndUpdate(userId, {
      $push: {
        collectionsRef: collectionId,
      },
    });
  }
}
