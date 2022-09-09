import bcrypt from "bcryptjs";
import { prisma } from "../app.js";
import bcrypt from "bcryptjs";

export default class UserService {
  static async create(req, res) {
    const { full_name, email, password, cpf, cnh, is_admin } = req.body;
    const fields = await verifyExistentUser(email, cpf, cnh);
    if (fields.length > 0) {
      return res
        .status(400)
        .json({ message: `Fields ${fields.join(", ")} already exists.` });
    }
    const user = await prisma.users.create({
      data: {
        full_name,
        email,
        password: await bcrypt.hash(password, 8),
        cpf,
        cnh,
        is_admin,
      },
    });
    delete user.password;
    return res.json(user);
  }

  static async index(req, res) {
    const allUsers = await prisma.users.findMany();
    allUsers.map((user) => delete user.password);
    return res.json(allUsers);
  }

  static async retrieve(req, res) {
    const user = await prisma.users.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    delete user.password;
    return user;
  }

  static async update(req, res) {
    const id = req.params.id;
    await findUser(id, res);
    const { full_name, email, password, cpf, cnh, is_admin } = req.body;
    let data = {};
    if (full_name) {
      data.full_name = full_name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = await bcrypt.hash(password, 8);
    }
    if (cpf) {
      data.cpf = cpf;
    }
    if (cnh) {
      data.cnh = cnh;
    }
    if (is_admin) {
      data.is_admin = is_admin;
    }
    const fields = verifyExistentUser(email, cpf, cnh, id);
    if (fields.length > 0) {
      return res
        .status(400)
        .json({ message: `Fields ${fields.join(", ")} already exists.` });
    }
    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    delete user.password;
    return user;
  }

  static async delete(req, res) {
    const id = req.params.id;
    await findUser(id, res);
    await prisma.users.delete({
      where: {
        id,
      },
    });

    return null;
  }
}

const verifyExistentUser = async (email, cpf, cnh) => {
  const fields = [];
  let user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    fields.push("email");
  }
  user = await prisma.users.findFirst({
    where: {
      cpf,
    },
  });
  if (user) {
    fields.push("cpf");
  }
  user = await prisma.users.findFirst({
    where: {
      cnh,
    },
  });
  if (user) {
    fields.push("cnh");
  }
  return fields;
};

const findUser = async (id, res) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
};
