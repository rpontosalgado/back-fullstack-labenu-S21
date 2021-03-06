import BaseError from "../errors/BaseError";
import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          nickname: user.getNickname(),
          password: user.getPassword()
        })
        .into(this.tableNames.users);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserByEmailOrNickname(input: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select()
        .from(this.tableNames.users)
        .where({ email: input })
        .orWhere({ nickname: input });

      return User.toUserModel(result[0]);
    } catch (error) {
      const { code, message, sqlMessage } = error;

      throw new BaseError(code || 400, sqlMessage || message);
    }
  }
}

export default new UserDatabase();