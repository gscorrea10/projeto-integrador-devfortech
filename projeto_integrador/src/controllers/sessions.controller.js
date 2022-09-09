import SessionsService from "../services/sessions.service";

export default class SessionsController {
  static login = async (req, res) => {
    const token = await SessionsService.login(req, res);
    return res.status(201).json(token);
  };

  static verifyToken = async (req, res) => {
    await SessionsService.verifyToken(req, res);
  };
}
