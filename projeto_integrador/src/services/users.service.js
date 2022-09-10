import bcrypt from "bcryptjs";
import { prisma } from "../app.js";
import AppError from "../errors/AppError.js";

export default class UserService {
  static async create(full_name, email, password, cpf, cnh, is_admin) {
    // try {
    //   prisma.vehicles.create({
    //     data: {
    //       id_user: "5876d730-0de8-4825-84ed-0e5988607d04",
    //       vehicle_state: "SP",
    //       license_plate: "ABC1234",
    //       renavam: "123456",
    //       model: "Gol",
    //       brand: "Volkswagen",
    //       year: 2010,
    //     },
    //   });
    // } catch (error) {
    //   throw new AppError(error.message, 500);
    // }
    const fields = await verifyExistentUser(email, cpf, cnh);
    if (fields.length > 0) {
      throw new AppError(`Fields ${fields.join(", ")} already exists.`, 400);
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
    return user;
  }

  static async index() {
    const allUsers = await prisma.users.findMany();
    allUsers.map((user) => delete user.password);
    return allUsers;
  }

  static async retrieve(id) {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new AppError("User not found.", 404);
    }
    delete user.password;
    return user;
  }

  static async update(id, full_name, email, password, cpf, cnh, is_admin) {
    const foundUser = await findUser(id);
    let data = {};
    if (full_name && full_name !== foundUser.full_name) {
      data.full_name = full_name;
    }
    if (email) {
      data.email = email;
    }
    if (password && !compare(password, foundUser.password)) {
      data.password = await bcrypt.hash(password, 8);
    }
    if (cpf && cpf !== foundUser.cpf) {
      data.cpf = cpf;
    }
    if (cnh && cnh !== foundUser.cnh) {
      data.cnh = cnh;
    }
    if (is_admin && is_admin !== foundUser.is_admin) {
      data.is_admin = is_admin;
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

  static async delete(id) {
    await findUser(id);
    await prisma.users.delete({
      where: {
        id,
      },
    });

    return {};
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

const findUser = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  return user;
};
