import { body, validationResult } from 'express-validator';

export const validationBodyCreateProcess = [
  body('ait', 'Ait is required').exists({ checkFalsy: true }),
  body('number_process', 'Number Process is required').exists({ checkFalsy: true }),
  body('infraction_uf', 'Only 2 caracters').toUpperCase().isLength({ max: 2 }),
  body('description', 'Too many caracters (50 max)').isLength({ max: 50 }),
  body('price', 'Must be a number').isFloat(),
];

export const validationBodyFindByAitProcess = [body('ait', 'Ait is required').exists({ checkFalsy: true })];

export const checkCreateProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  next();
};

export const checkGetByAitProcess = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
