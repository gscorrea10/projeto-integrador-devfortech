import { prisma } from '../database/prismaClient.js';

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
  ) {
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
      },
    });

    return process;
  }

  static async getByAit(ait) {
    const process = await prisma.process.findUnique({
      where: {
        ait,
      },
    });

    return process;
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
