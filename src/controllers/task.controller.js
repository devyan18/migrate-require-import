import { conn } from "../database.js";

// ? se agrega _ para indicar que no se usara el req

// GET /tasks
export const mostrarTareas = async (_req, res) => {
  try {
    const [consulta] = await conn.query("SELECT * FROM tasks");

    res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      ok: false,
      message: "Error al mostrar las tareas",
    });
  }
};

// POST /tasks
export const agregarTarea = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    const [consulta] = await conn.query(
      "INSERT INTO tasks(title, description, isComplete) VALUES(?, ?, ?)",
      [title, description, isComplete]
    );

    if (consulta.affectedRows == 0) {
      return res.send("No se pudo agregar la tarea");
    }

    res.status(201).json({
      status: "success",
      ok: true,
      message: "Tarea agregada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      ok: false,
      message: "Error al agregar la tarea",
    });
  }
};

// GET /tasks/:id
export const mostrarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const [consulta] = await conn.query("SELECT * FROM tasks WHERE id = ?", [
      id,
    ]);

    if (consulta.length == 0) {
      return res.status(404).json({
        status: "error",
        ok: false,
        message: "No se encontro la tarea",
      });
    }

    res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      ok: false,
      message: "Error al mostrar la tarea",
    });
  }
};

// PUT /tasks/:id
export const cambiarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { title, description, isComplete } = req.body;

    const [consultaCambiar] = await conn.query(
      "UPDATE tasks SET title = ?, description=?, isComplete=? WHERE id = ?",
      [title, description, isComplete, id]
    );

    if (consultaCambiar.affectedRows == 0) {
      return res.status(500).json({
        status: "error",
        ok: false,
        message: "No se pudo editar la tarea",
      });
    }

    res.status(200).json({
      status: "success",
      ok: true,
      message: "Tarea editada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      ok: false,
      message: "Error al editar la tarea",
    });
  }
};

// DELETE /tasks/:id
export const borrarTarea = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const [consulta] = await conn.query("SELECT * FROM tasks WHERE id = ?", [
      id,
    ]);

    if (consulta.length == []) {
      return res.send("El id puesto para borrar no existe");
    }

    const [consultaBorrar] = await conn.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    if (consultaBorrar.affectedRows == 0) {
      return res.status(500).json({
        status: "error",
        ok: false,
        message: "No se pudo borrar la tarea",
      });
    }

    res.status(204).json({
      status: "success",
      ok: true,
      message: "Tarea borrada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      ok: false,
      message: "Error al borrar la tarea",
    });
  }
};
