import express from "express";
import morgan from "morgan";
import cors from "cors";

import { fileURLToPath } from "node:url";
import { conn } from "./database.js";
import { join } from "node:path";

import { taskRouter } from "./routes/task.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "../");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/public", express.static(join(__dirname, "uploads")));

app.use("/tasks", taskRouter);

// TODO: Manejador de errores
// * Permite que cuando se nos escape un error entre los controladores,
// * este sea capturado por la propiedad 'err' y de esa
// * manera proteger nuestro proceso principal.

// ? (se agrega _ antes de las propiedades para indicar que no se usan)
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

    console.log("Servidor funcionando en el puerto 4000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
