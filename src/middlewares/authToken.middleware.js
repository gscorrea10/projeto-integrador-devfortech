import jwt from "jsonwebtoken";
require("dotenv").config();

export default class AuthTokenMiddleware {
  static async verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Missing header authorization." });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Missing header authorization." });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.is_admin = decoded.is_admin;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  }
}
