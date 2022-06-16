import { injectable } from "tsyringe";
import UsersRepository from "../../repositories/users.repository";
import config from "config";
import { sign } from "jsonwebtoken";

@injectable()
export default class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute() {
    const user = await this.usersRepository.create();
    const jwt = sign({ user: { id: user.id } }, config.get("jwt.secret"));
    return { accessToken: jwt };
  }
}
