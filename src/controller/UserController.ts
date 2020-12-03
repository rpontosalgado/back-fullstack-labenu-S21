import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import BaseDatabase from "../data/BaseDatabase";
import { LoginInputDTO, UserInputDTO } from "../model/User";

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }

      const token = await UserBusiness.createUser(input);

      res.status(201).send({ token });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }

    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginInputDTO = {
        input: req.body.input,
        password: req.body.password
      }

      const token = await UserBusiness.getUserByEmailOrNickname(
        loginData
      );

      res.status(200).send({ token });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }

    await BaseDatabase.destroyConnection();
  }
}

export default new UserController();