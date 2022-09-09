import UserService from "../services/users.service.js";

export default class UsersController {
  static create = async (req, res) => {
    const user = await UserService.create(req, res);
    return res.status(201).json(user);
  };
  static index = async (req, res) => {
    const allUsers = await UserService.index(req, res);
    return res.status(200).json(allUsers);
  };

  static retrieve = async (req, res) => {
    const user = await UserService.retrieve(req, res);
    return res.status(200).json(user);
  };

  static update = async (req, res) => {
    const user = await UserService.update(req, res);
    return res.status(200).json(user);
  };

  static destroy = async (req, res) => {
    await UserService.delete(req, res);
    return res.status(204).json({});
  };
}
