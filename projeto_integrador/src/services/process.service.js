import { prisma } from '../database/prismaClient.js';
import AppError from '../errors/AppError.js';

class ProcessService {
  static async create(
    ait,
    process_date,
    description,
    number_process,
    code_ctb,
    infraction_uf,
    price,
    process_status,
    finished,
    id_vehicle,
    userId,
  ) {
    const existentFields = await verifyUniqueFields(ait, number_process);
    if (existentFields.length > 0) {
      throw new AppError(`Process with ${existentFields.join(', ')} already exists`, 400);
    }
    const process = await prisma.process.create({
      data: {
        ait,
        process_date, //new Date(process_date).toISOString(),
        description,
        number_process,
        code_ctb,
        infraction_uf,
        price,
        process_status,
        finished,
        id_vehicle,
        usersId: userId,
      },
    });

    return process;
  }

  static async getByNumberProcess(number_process, userId, is_admin) {
    const process = await prisma.process.findUnique({
      where: {
        number_process,
      },
      include: {
        vehicle: {
          select: {
            license_plate: true,
            renavam: true,
            vehicle_state: true,
            Bills: {
              select: {
                description: true,
                cnh_points: true,
                severity: true,
              },
            },
          },
        },
      },
    });
    if (!process) {
      throw new AppError('Process not found', 404);
    }
    if (userId === process.usersId || is_admin) {
      return process;
    }
    throw new AppError('You are not authorized to access this process', 401);
  }

  static async getAllProcessFromVehicle(id_vehicle, userId, is_admin) {
    const process = await prisma.process.findMany({
      where: {
        id_vehicle: id_vehicle,
      },
    });
    if (!process) {
      throw new AppError('Process not found', 404);
    }
    if (userId === process.usersId || is_admin) {
      return process;
    }
    throw new AppError('You are not authorized to access this process', 401);
  }

  static async update(
    id,
    ait,
    process_date,
    description,
    number_process,
    code_ctb,
    infraction_uf,
    price,
    process_status,
    finished,
    id_vehicle,
  ) {
    /*const existentFields = await verifyUniqueFields(ait, code);
    if (existentFields.length > 0) {
      throw new AppError(`Process with ${existentFields.join(', ')} already exists`, 400);
    }*/
    const process = await prisma.process.update({
      where: {
        id,
      },
      data: {
        ait,
        process_date,
        description,
        number_process,
        code_ctb,
        infraction_uf,
        price,
        process_status,
        finished,
        id_vehicle,
      },
    });
    return process;
  }

  static async deleteProcess(id) {
    const process = await prisma.process.delete({
      where: {
        id,
      },
    });

    return process;
  }
}

export { ProcessService };

const verifyUniqueFields = async (ait, number_process) => {
  const fields = [];
  let process = await prisma.process.findFirst({
    where: {
      ait,
    },
  });
  if (process) {
    fields.push('ait');
  }
  process = await prisma.process.findFirst({
    where: {
      number_process,
    },
  });
  if (process) {
    fields.push('number_process');
  }
  return fields;
};
