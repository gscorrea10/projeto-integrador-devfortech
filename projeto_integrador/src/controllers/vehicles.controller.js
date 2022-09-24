import VehiclesService from '../services/vehicles.service.js';

export default class VehiclesController {
  static create = async (req, res) => {
    try {
      const { vehicle_state, id_user, renavam, model, license_plate, year, brand } = req.body;

      const vehicle = await VehiclesService.create(id_user, vehicle_state, license_plate, renavam, model, brand, year);

      return res.status(201).json(vehicle);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };
  static index = async (req, res) => {
    try {
      const id_user = req.userId;
      const allVehicles = await VehiclesService.index(id_user);

      return res.status(200).json(allVehicles);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static retrieve = async (req, res) => {
    try {
      const id = req.params.id;
      const vehicles = await VehiclesService.retrieve(id);
      return res.status(200).json(vehicles);
    } catch (err) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      const { vehicle_state, id_user, renavam, model, license_plate, year, brand } = req.body;
      const { id } = req.params;
      const vehicles = await VehiclesService.update(
        id,
        id_user,
        vehicle_state,
        license_plate,
        renavam,
        model,
        brand,
        year,
      );
      return res.status(200).json(vehicles);
    } catch (err) {
      return res.status(200).json({ message: err.message });
    }
  };

  static destroy = async (req, res) => {
    try {
      const { id } = req.params;
      await VehiclesService.delete(id);
      return res.status(204).json({});
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };
}
