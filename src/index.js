import express from "express";
import cors from "cors";
import morgan from "morgan";

import { taskRouter } from "./routes/task.routes.js";
import { conectar } from "./database.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Algo salio mal");
  }
});

app.listen(4000, async () => {
  try {
    const db = await conectar();

    console.log("Conectado a la base de datos");

    await db.end();

    console.log("Serivdor funcionando en el puerto 4000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
