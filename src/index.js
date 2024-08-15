import express from "express";
import cors from "cors";
import morgan from "morgan";

import { taskRouter } from "./routes/task.routes.js";
import { conn } from "./database.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRouter);

// TODO: Manejador de errores
// * Permite que cuando se nos escape un error entre los controladores,
// * este sea capturado por la propiedad 'err' y de esa
// * manera proteger nuestro proceso principal.

app.use((err, _req, res, _next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Algo salio mal");
  }
});

app.listen(4000, async () => {
  try {
    const result = await conn.query("SELECT 1 + 1 AS resultado");
    if (result[0][0].resultado === 2) {
      console.log("Conexión a la base de datos exitosa");
    }

    console.log("Serivdor funcionando en el puerto 4000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
