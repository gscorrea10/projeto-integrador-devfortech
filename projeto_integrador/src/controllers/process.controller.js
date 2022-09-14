import { ProcessService } from '../services/process.service';

export class ProcessController {
  static create = async (req, res) => {
    try {
      const {
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
      } = req.body;
      const process = await ProcessService.create(
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
      );
      return res.status(201).json(process);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  static getByAit = async (req, res) => {
    try {
      const ait = req.body.ait;
      const process = await ProcessService.getByAit(ait);
      return res.status(200).json(process);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      const {
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
      } = req.body;
      const { id } = req.params;
      const process = await ProcessService.update(
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
      );
      return res.status(200).json(process);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  static deleteProcess = async (req, res) => {
    try {
      const { id } = req.params;
      await ProcessService.deleteProcess(id);
      return res.status(204).json({});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}
