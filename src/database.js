import { createPool } from "mysql2/promise";

export const conectar = () => {
  try {
    return createPool({
      host: "localhost",
      user: "root",
      password: "root",
      port: 3306,
      database: "tasks_db",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const conn = conectar();

export { conn };
