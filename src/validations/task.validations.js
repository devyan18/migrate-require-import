import { body } from "express-validator"

// POST /tasks
export const createTaskValidation = [
  body("title")
    .isString().withMessage("El titulo debe ser un string")
    .notEmpty().withMessage("El titulo no puede estar vacio"),
  body('description')
    .isString().withMessage("La descripcion debe ser un string")
    .notEmpty().withMessage("La descripcion no puede estar vacia"),
  body('isComplete')
    .isBoolean().withMessage("isComplete debe ser un boolean")
    .notEmpty().withMessage("isComplete no puede estar vacio")
]

// PUT /tasks
export const updateTaskValidation = [
  body("title")
    .optional() // permite no mandar el campo pero si lo mandas debe cumplir con las reglas
    .isString().withMessage("El titulo debe ser un string"),
  body('description')
    .optional()
    .isString().withMessage("La descripcion debe ser un string"),
  body('isComplete')
    .optional()
    .isBoolean().withMessage("isComplete debe ser un boolean")
]