import { prisma } from "../app.js";
import AppError from "../errors/AppError.js";

export default class VehiclesService {
  static async create(id_user, vehicle_state, license_plate, renavam, model, brand, year ) {
    try {
      const fields = await verifyExistentVehicle(renavam, license_plate);
      if (fields.length > 0) {
        throw new AppError(`Fields ${fields.join(", ")} already exists.`, 400);
      }
      const vehicles = await prisma.vehicles.create({
        data: {
          id_user,
          vehicle_state,
          license_plate,
          renavam,
          model,
          brand,
          year,
        },
      });
      return vehicles;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  static async index() {
    const allVehicles = await prisma.vehicles.findMany();
    return allVehicles;
  }

  static async retrieve(id) {
    const vehicles = await prisma.vehicles.findFirst({
      where: {
        id,
      },
    });
    if (!vehicles) {
      throw new AppError("vehicles not found.", 404);
    }
    return vehicles;
  }

  static async update(
    id, id_user, vehicle_state, license_plate, renavam, model, brand, year 
  ) {
    const foundVehicles = await findVehicles(id);
    let data = {};
    if (vehicle_state && vehicle_state !== foundVehicles.vehicle_state) {
      data.vehicle_state = vehicle_state;
    }
    if (id_user) {
      data.id_user = id_user;
    }
    if (renavam && renavam !== foundVehicles.renavam) {
      data.renavam = renavam;
    }
    if (model && model !== foundVehicles.model) {
      data.model = model;
    }
    if (license_plate && license_plate !== foundVehicles.license_plate) {
      data.license_plate = license_plate;
    }
    if (year && year !== foundVehicles.year) {
      data.year = year;
    }
    if (brand && brand !== foundVehicles.brand) {
      data.brand = brand;
    }
    const vehicles = await prisma.vehicles.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return vehicles;
  }

  static async delete(id) {
    await findVehicles(id);
    await prisma.vehicles.delete({
      where: {
        id,
      },
    });

    return {};
  }
}

const verifyExistentVehicle = async (renavam, license_plate) => {
  const fields = [];
  let vehicles = await prisma.vehicles.findFirst({
    where: {
      renavam,
    },
  });
  if (vehicles) {
    fields.push("renavam");
  }
  vehicles = await prisma.vehicles.findFirst({
    where: {
      license_plate,
    },
  });
  if (vehicles) {
    fields.push("license_plate");
  }
  return fields;
};

const findVehicles = async (id) => {
  const vehicles = await prisma.vehicles.findFirst({
    where: {
      id,
    },
  });
  if (!vehicles) {
    throw new AppError("vehicles not found.", 404);
  }
  return vehicles;
};
