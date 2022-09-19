import { prisma } from "@prisma/client";
import BillsService from "../services/bills.service";

export default class BillsController {
  static search_plate = async (req, res) => {
    try {
      const { id_vehicle } = req.body;
      const bill = await BillsService.search_plate(id_vehicle);
      return res.status(200).json(bill);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static getVehicleBills = async (req, res) => {
    try {
      const { id_vehicle } = req.params;
      const bills = await BillsService.getVehicleBills(id_vehicle);
      return res.status(200).json(bills);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
