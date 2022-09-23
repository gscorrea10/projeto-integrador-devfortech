import { body, validationResult } from 'express-validator';

export const validationBodyCallAPI = [body('id_vehicle', 'id_vehicle is required').exists({ checkFalsy: true })];

export const checkCallAPI = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
