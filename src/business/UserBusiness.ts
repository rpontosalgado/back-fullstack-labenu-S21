import userDatabase, { UserDatabase } from "../data/UserDatabase";
import BaseError from "../errors/BaseError";
import ConflictError from "../errors/ConflictError";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import { LoginInputDTO, User, UserInputDTO } from "../model/User";
import authenticator,{ Authenticator } from "../services/Authenticator";
import hashManager, { HashManager } from "../services/HashManager";
import idGenerator, { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor (
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase
  ){}

  async createUser(user: UserInputDTO): Promise<string> {
    try {
      const { name, email, password } = user;

      if (!name || !email || !password) {
          throw new UnprocessableEntityError("Missing inputs");
      }

      if (email.indexOf("@") === -1) {
          throw new UnprocessableEntityError("Invalid Email!");
      }

      if (password.length < 6) {
          throw new UnprocessableEntityError("Invalid Password!");
      }

      const id: string = this.idGenerator.generate();

      const hashPassword: string = await this.hashManager.hash(password);

      await this.userDatabase.createUser(
        new User(
          id,
          name,
          email,
          hashPassword
          // User.stringToUserRole(role)
        )
      );

      const accessToken: string = this.authenticator.generateToken({
        id
        // role
      });

      return accessToken;
    } catch (error) {
      const { code, message } = error;

      if (error.message.includes("for key 'email'")) {
        throw new ConflictError("E-mail already in use");
      }
      if (error.message.includes("for key 'nickname'")) {
        throw new ConflictError("Nickname already in use");
      }

      throw new BaseError(code || 400, message);
    }
  }

  async getUserByEmailOrNickname(user: LoginInputDTO): Promise<string> {
    try {
      const { input, password } = user;

      if (!input || !password) {
        throw new UnprocessableEntityError("Missing unputs");
      }

      const userFromDB: User = await this.userDatabase.getUserByEmailOrNickname(input);

      if (!userFromDB) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const hashCompare = await this.hashManager.compare(
        password,
        userFromDB.getPassword()
      );

      if (!hashCompare) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const accessToken = this.authenticator.generateToken({
        id: userFromDB.getId()
      });

      return accessToken;
    } catch (error) {
      const { code, message } = error;

      throw new BaseError(code || 400, message);
    }
  }
}

export default new UserBusiness(
  idGenerator,
  hashManager,
  authenticator,
  userDatabase
)