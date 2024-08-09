import express from "express"
import cors from "cors"
import morgan from "morgan"

import { taskRouter } from "./routes.js"

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRouter)//

app.listen(4000, () => {
  console.log("Serivdor funcionando en el puerto 4000")
})