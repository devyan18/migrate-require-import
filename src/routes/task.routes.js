import { Router } from "express";

const taskRouter = Router();

import {
  mostrarTareas,
  borrarTarea,
  cambiarTarea,
  mostrarTarea,
  agregarTarea,
} from "../controllers/task.controller.js";

import {
  createTaskValidation,
  idTaskValidation,
  updateTaskValidation,
} from "../validations/task.validations.js";

import { applyValidations } from "../middlewares/applyValidations.js";

taskRouter.get("/", mostrarTareas);

taskRouter.get("/:id", idTaskValidation, applyValidations, mostrarTarea);
taskRouter.post("/", createTaskValidation, applyValidations, agregarTarea);
taskRouter.put("/:id", updateTaskValidation, applyValidations, cambiarTarea);
taskRouter.delete("/:id", idTaskValidation, applyValidations, borrarTarea);

export { taskRouter };
