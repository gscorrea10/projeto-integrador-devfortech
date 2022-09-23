import { body, validationResult } from 'express-validator';

export const validationBodyCreateUser = [
  body('full_name', 'full_name is required').exists({ checkFalsy: true }),
  body('email', 'Email is required').exists({ checkFalsy: true }),
  body('password', 'Min 8 char').isLength({ min: 8 }),
  body('cpf', 'CPF have 11 char').isLength({ min: 11, max: 11 }),
  body('cnh', 'CNH have 9 char').isLength({ min: 9, max: 9 }),
  body('is_admin', 'is_admin must be a boolean').isBoolean({ loose: false }),
];

export const checkCreateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validationBodyUpdateUser = [
  body('full_name', 'full_name is required').exists({ checkFalsy: true }),
  body('email', 'Email is required').exists({ checkFalsy: true }),
  body('password', 'Min 8 char').isLength({ min: 8 }),
  body('cpf', 'CPF have 11 char').isLength({ min: 11, max: 11 }),
  body('cnh', 'CNH have 9 char').isLength({ min: 9, max: 9 }),
  body('is_admin', 'is_admin must be a boolean').isBoolean({ loose: false }),
];

export const checkUpdateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
