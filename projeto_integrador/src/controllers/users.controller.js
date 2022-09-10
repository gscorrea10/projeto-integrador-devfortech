import UserService from "../services/users.service.js";

export default class UsersController {
  static create = async (req, res) => {
    try {
      const { full_name, email, password, cpf, cnh, is_admin } = req.body;
      const user = await UserService.create(
        full_name,
        email,
        password,
        cpf,
        cnh,
        is_admin
      );
      return res.status(201).json(user);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
  static index = async (req, res) => {
    try {
      const allUsers = await UserService.index();
      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static retrieve = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserService.retrieve(id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      const { full_name, email, password, cpf, cnh, is_admin } = req.body;
      const { id } = req.params;
      const user = await UserService.update(
        id,
        full_name,
        email,
        password,
        cpf,
        cnh,
        is_admin
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(200).json({ message: err.message });
    }
  };

  static destroy = async (req, res) => {
    try {
      const { id } = req.params;
      await UserService.delete(id);
      return res.status(204).json({});
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
