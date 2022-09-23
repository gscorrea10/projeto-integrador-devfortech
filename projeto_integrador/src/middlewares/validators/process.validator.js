import { body, validationResult } from 'express-validator';

export const validationBodyCreateProcess = [
  body('ait', 'ait is required').exists({ checkFalsy: true }),
  body('number_process', 'number_process is required').exists({ checkFalsy: true }),
  body('infraction_uf', 'Only 2 caracters').toUpperCase().isLength({ max: 2 }),
  body('description', 'Too many caracters (50 max)').isLength({ max: 50 }),
  body('price', 'Must be a number').isFloat(),
];

export const validationBodyGetByNumberProcess = [
  body('number_process', 'number_process is required').exists({ checkFalsy: true }),
];

export const validationGellAllProcess = [body('id_vehicle', 'id_vehicle is required').exists({ checkFalsy: true })];

export const validationBodyUpdateProcess = [
  body('ait', 'ait is required').exists({ checkFalsy: true }),
  body('number_process', 'number_process is required').exists({ checkFalsy: true }),
  body('infraction_uf', 'Only 2 caracters').toUpperCase().isLength({ max: 2 }),
  body('description', 'Too many caracters (50 max)').isLength({ max: 50 }),
  body('price', 'Must be a number').isFloat(),
];

export const checkGetAllProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const checkCreateProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const checkGetByNumberProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const checkUpdateProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
