import { prisma } from '../database/prismaClient.js';
import AppError from '../errors/AppError.js';

class ProcessService {
  static async create(
    ait,
    infraction_date,
    description,
    code,
    code_ctb,
    infraction_uf,
    price,
    process_status,
    finished,
    id_vehicle,
    userId,
  ) {
    const existentFields = await verifyUniqueFields(ait, code)
      if (existentFields.length > 0) {
        throw new AppError(`Process with ${existentFields.join(', ')} already exists`, 400);
      }
    const process = await prisma.process.create({
      data: {
        ait,
        infraction_date: new Date(infraction_date).toISOString(),
        description,
        code,
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

  static async getByAit(ait, userId, is_admin) {
    const process = await prisma.process.findUnique({
      where: {
        ait,
      },
    });
    if(!process){
      throw new AppError('Process not found', 404);
    }
    if(userId === process.usersId || is_admin) {
    return process;
    }
    throw new AppError('You are not authorized to access this process', 401);
  }

  static async update(
    id,
    ait,
    infraction_date,
    description,
    code,
    code_ctb,
    infraction_uf,
    price,
    process_status,
    finished,
    id_vehicle,
  ) {
      const existentFields = await verifyUniqueFields(ait, code)
      if (existentFields.length > 0) {
        throw new AppError(`Process with ${existentFields.join(', ')} already exists`, 400);
      }
      const process = await prisma.process.update({
        where: {
          id,
        },
        data: {
          ait,
          infraction_date,
          description,
          code,
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

const verifyUniqueFields = async (ait, code) => {
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
      code,
    },
  });
  if (process) {
    fields.push('code');
  }
  return fields;
};
