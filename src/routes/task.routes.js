import { Router } from "express"

const taskRouter = Router()

import {
  mostrarTareas,
  borrarTarea,
  cambiarTarea,
  mostrarTarea,
  agregarTarea
} from "../controllers/task.controller.js"

import { createTaskValidation } from "../validations/task.validations.js"
import { applyValidations } from "../middlewares/applyValidations.js"

taskRouter.get("/", mostrarTareas)

taskRouter.get("/:id", mostrarTarea)
taskRouter.post("/", createTaskValidation, applyValidations, agregarTarea)
taskRouter.put("/:id", cambiarTarea)
taskRouter.delete("/:id", borrarTarea)


export { taskRouter };