import jwt from "jsonwebtoken";
require("dotenv").config();

export default class IsAdmin {
  static async verifyAdmin(req, res, next) {
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
      if (decoded.is_admin === true) {
        return next();
      }
      return res
        .status(403)
        .json({ message: "User has no permission to do this action." });
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  }
}
