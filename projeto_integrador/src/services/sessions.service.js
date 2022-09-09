import jwt from "jsonwebtoken";
import { prisma } from "../app.js";
import { compare } from "bcryptjs";

export default class SessionsService {
  static async login(req, res) {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await compare(req.body.password, user.password);
    const emailMath = req.body.email === user.email;
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
    return res.status(401).json({ message: "Invalid credentials" });
  }

  static verifyToken(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Field token is required." });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ message: "Valid token." });
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  }
}
