import { createConnection } from "mysql2/promise";

const conectar = async (req, res) => {
    return await createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "tasks_db"
    })
}
export { conectar }