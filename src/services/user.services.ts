import { Prisma } from "@prisma/client";
import prisma from "../db/prisma";
import { userSchema } from "../schemas/userSchemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  async createUser(data: Prisma.UserCreateInput) {
    const validationData = userSchema.parse(data);
    const hashPassword: any = await bcrypt.hash(validationData.password, 10);
    const isEmailExist = await prisma.user.findUnique({
      where: { email: validationData.email },
    });
    if (isEmailExist) {
      throw new Error("Email already in use");
    }
    const isUsernameExist = await prisma.user.findUnique({
      where: { username: validationData.username },
    });
    if (isUsernameExist) {
      throw new Error("User already in use");
    }
    const user = await prisma.user.create({
      data: {
        fullName: validationData.fullName,
        username: validationData.username,
        email: validationData.email,
        password: hashPassword,
      },
    });
    return user;
  }

  async loginUser(data: { userLogin: string; password: string }) {
    const { userLogin, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: userLogin }, { username: userLogin }],
      },
    });
    if (!user) {
      throw new Error("user not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("password is not valid");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}
