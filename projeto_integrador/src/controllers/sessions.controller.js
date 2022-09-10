import SessionsService from "../services/sessions.service";

export default class SessionsController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await SessionsService.login(email, password);
      return res.status(201).json(token);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static verifyToken = async (req, res) => {
    try {
      const { token } = req.body;
      return res.status(200).json(SessionsService.verifyToken(token));
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
