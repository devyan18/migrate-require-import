import { Router } from "express"

const taskRouter = Router()

import {
  mostrarTareas,
  borrarTarea,
  cambiarTarea,
  mostrarTarea,
  agregarTarea
} from "./controllers.js"

import { validacionesDeTasks } from "./validations.js"
import { applyValidations } from "./applyValidations.js"
import { body } from "express-validator"

taskRouter.get("/", mostrarTareas)

taskRouter.post("/",
  validacionesDeTasks, applyValidations, agregarTarea)

taskRouter.get("/:id", mostrarTarea)
taskRouter.put("/:id", cambiarTarea)
taskRouter.delete("/:id", borrarTarea)


export { taskRouter };