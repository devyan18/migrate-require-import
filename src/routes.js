import { Router } from "express"

const taskRouter = Router()

import {
  mostrarTareas,
  borrarTarea,
  cambiarTarea,
  mostrarTarea,
  agregarTarea
} from "./controllers.js"

taskRouter.get("/", mostrarTareas)
taskRouter.post("/", agregarTarea)
taskRouter.get("/:id", mostrarTarea)
taskRouter.put("/:id", cambiarTarea)
taskRouter.delete("/:id", borrarTarea)


export { taskRouter };