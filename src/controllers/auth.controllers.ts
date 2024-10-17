import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { responseStatusMsg } from "../helpers/response";

export class AuthController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  //register user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, username, email, password } = req.body;

      await this.userService.createUser({
        fullName,
        username,
        email,
        password,
      });
      req.body.userLogin = email;
      req.body.password = password;

      this.login(req, res);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { userLogin, password } = req.body;

      const { token, user } = await this.userService.loginUser({
        userLogin,
        password,
      });

      res.cookie("Token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 900000,
      });

      responseStatusMsg(res, 200, "Ok", "success_data", user);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
}
