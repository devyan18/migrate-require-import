import { createConnection } from "mysql2/promise";

export const conectar = async () => {
  try {
    return await createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "tasks_db",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
