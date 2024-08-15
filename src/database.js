import { createPool } from "mysql2/promise";

export const conectar = () => {
  try {
    return createPool({
      host: "localhost",
      user: "root",
      password: "root",
      port: 3308,
      database: "tasks_db",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const conn = conectar();

function stopConnection() {
  conn.end((err) => {
    if (err) {
      console.error("Error al cerrar la pool de MySQL:", err);
    } else {
      console.log("Pool de MySQL cerrada correctamente.");
    }
    process.exit(0);
  });
}

// Capturar señales de interrupción (Ctrl+C) y terminación
process.on("SIGINT", stopConnection);
process.on("SIGTERM", stopConnection);

export { conn };
