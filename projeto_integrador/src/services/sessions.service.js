import jwt from "jsonwebtoken";
import { prisma } from "../app.js";
import { compare } from "bcryptjs";
import AppError from "../errors/AppError.js";

export default class SessionsService {
  static async login(email, password) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError("Invalid credentials.", 401);
    }

    const passwordMatch = await compare(password, user.password);
    const emailMath = email === user.email;
    if (passwordMatch && emailMath) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return { token: token };
    }
    throw new AppError("Invalid credentials.", 401);
  }

  static verifyToken(token) {
    if (!token) {
      throw new AppError("Field token is required.", 400);
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return { message: "Valid token." };
    } catch (err) {
      throw new AppError("Invalid token.", 400);
    }
  }
}
