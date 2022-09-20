import { prisma } from '../app';
import axios from 'axios';
import AppError from '../errors/AppError';
require('dotenv').config();

export default class BillsService {
  static search_plate = async (id_vehicle) => {
    const vehicle = await prisma.vehicles.findFirst({
      where: {
        id: id_vehicle,
      },
    });
    if (!vehicle) {
      throw new AppError('Vehicle not found.', 404);
    }
    const vehicle_info = await getVehicleInfo(vehicle.license_plate);
    try {
      const bills = await prisma.bills.createMany({
        data: [
          ...vehicle_info.data[0].multas.map((multa) => {
            return {
              id_vehicle: id_vehicle,
              auto: multa.auto,
              data_hora: new Date(normalizeDateFormat(multa.normalizado_datahora)),
              price: multa.normalizado_valor,
              type: multa.tipo_infracao,
              city: multa.municipio,
              address: multa.local,
              description: multa.descricao_infracao,
              cnh_points: multa.pontos,
              severity: multa.gravidade_multa,
            };
          }),
        ],
      });
      const registered_bills = await prisma.bills.findMany({
        where: {
          id_vehicle: id_vehicle,
        },
      });
      return vehicle_info;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  };

  static async getVehicleBills(id_vehicle) {
    try {
      const vehicle = await prisma.vehicles.findFirst({
        where: {
          id: id_vehicle,
        },
      });
      if (!vehicle) {
        throw new AppError('Vehicle not found.', 404);
      }
      const bills = await prisma.bills.findMany({
        where: {
          id_vehicle: id_vehicle,
        },
        include: {
          vehicle: true,
        },
      });
      return bills;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}

const getVehicleInfo = async (plate) => {
  try {
    const vehicle_info = await axios
      .get(
        `https://api.infosimples.com/api/v2/consultas/detran/ms/multas?token=${process.env.API_TOKEN}&timeout=600&placa=${plate}`,
      )
      .then((resp) => resp.data);
    if (vehicle_info.data[0].multas.length === 0) {
      throw new AppError('No fines found for this vehicle.', 404);
    }
    return vehicle_info;
  } catch (error) {
    throw new AppError(error.message, 404);
  }
};

const normalizeDateFormat = (data) => {
  const [date, time] = data.split(' ');
  const [day, month, year] = date.split('/');
  const formatted_data = `${year}-${month}-${day} ${time}`;
  return formatted_data;
};
