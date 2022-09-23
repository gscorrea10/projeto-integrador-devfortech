import { body, validationResult } from 'express-validator';

export const validationBodyCreateVehicle = [
  body('id_user', 'id_user is required').exists({ checkFalsy: true }),
  body('vehicle_state', 'Only 2 caracters').toUpperCase().isLength({ max: 2 }),
  body('license_plate', 'Min 7 caracters').isLength({ min: 7, max: 7 }),
  body('renavam', 'Renavam have 9 caracters').isLength({ min: 9, max: 9 }),
  body('model', 'model is required').exists({ checkFalsy: true }),
  body('brand', 'brand is required').exists({ checkFalsy: true }),
];

export const checkCreateVehicle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
