import { validationResult } from "express-validator";
import { errorParser } from "../helpers/errorParser.js";

export const applyValidations = (req, res, next) => {
  const errores = validationResult(req);

  const parsedErrors = errorParser(errores);

  if (!errores.isEmpty()) {
    return res.status(400).json(parsedErrors);
  }

  next();
};
