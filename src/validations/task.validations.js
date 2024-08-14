import { body, param } from "express-validator";

// POST /tasks
export const createTaskValidation = [
  body("title")
    .isString()
    .withMessage("El titulo debe ser un string")
    .notEmpty()
    .withMessage("El titulo no puede estar vacio")
    .isLength({ min: 5 })
    .withMessage("El titulo debe tener al menos 5 caracteres"),
  body("description")
    .isString()
    .withMessage("La descripcion debe ser un string")
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .isLength({ min: 5 })
    .withMessage("La descripcion debe tener al menos 5 caracteres"),
  body("isComplete")
    .isBoolean()
    .withMessage("isComplete debe ser un boolean")
    .notEmpty()
    .withMessage("isComplete no puede estar vacio"),
];

// PUT /tasks
export const updateTaskValidation = [
  body("title")
    .optional() // permite no mandar el campo pero si lo mandas debe cumplir con las reglas
    .isString()
    .withMessage("El titulo debe ser un string")
    .isLength({ min: 5 })
    .withMessage("El titulo debe tener al menos 5 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripcion debe ser un string")
    .isLength({ min: 5 })
    .withMessage("La descripcion debe tener al menos 5 caracteres"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser un boolean"),
];

export const idTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .notEmpty()
    .withMessage("El id no puede estar vacio"),
];
