import { conectar } from "../database.js";

export const mostrarTareas = async (req, res) => {
  let conexion;

  try {
    conexion = await conectar();
    const [consulta] = await conexion.query("SELECT * FROM TASKS");

    res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.send("Error al mostrar las tareas");
  } finally {
    await conexion.end();
  }
};

export const agregarTarea = async (req, res) => {
  let conexion;

  try {
    conexion = await conectar();
    const { title, description, isComplete } = req.body;

    const [consulta] = await conexion.query(
      "INSERT INTO tasks(title, description, isComplete) VALUES(?, ?, ?)",
      [title, description, isComplete]
    );

    if (consulta.affectedRows == 0) {
      return res.send("No se pudo agregar la tarea");
    }

    res.status(201).send("Se agrego una tarea con exito");
  } catch (error) {
    console.log(error);
    res.send("Error al agregar una tarea");
  } finally {
    await conexion.end();
  }
};

export const mostrarTarea = async (req, res) => {
  let conexion;

  try {
    conexion = await conectar();
    const id = parseInt(req.params.id);

    const [consulta] = await conexion.query(
      "SELECT * FROM TASKS WHERE id = ?",
      [id]
    );

    if (consulta.length == 0) {
      return res.status(404).send("El id puesto no existe");
    }

    res.send(consulta);
  } catch (error) {
    console.log(error);
    res.send("Error al mostrar la tarea");
  } finally {
    await conexion.end();
  }
};

export const cambiarTarea = async (req, res) => {
  let conexion;

  try {
    conexion = await conectar();
    const id = parseInt(req.params.id);

    const { title, description, isComplete } = req.body;

    const [consultaCambiar] = await conexion.query(
      "UPDATE tasks SET title = ?, description=?, isComplete=? WHERE id = ?",
      [title, description, isComplete, id]
    );

    if (consultaCambiar.affectedRows == 0) {
      return res.send("No se pudo editar la tarea");
    }

    res.status(201).send("Tarea editada con exito");
  } catch (error) {
    console.log(error);
    res.send("Error al editar la tarea");

    await conexion.end();
  }
};

export const borrarTarea = async (req, res) => {
  let conexion;

  try {
    conexion = await conectar();
    const id = parseInt(req.params.id);

    const [consulta] = await conexion.query(
      "SELECT * FROM TASKS WHERE id = ?",
      [id]
    );

    if (consulta.length == []) {
      return res.send("El id puesto para borrar no existe");
    }

    const [consultaBorrar] = await conexion.query(
      "DELETE FROM TASKS WHERE id = ?",
      [id]
    );

    if (consultaBorrar.affectedRows == 0) {
      return res.send("No se pudo borrar la tarea");
    }

    res.status(204).send("Tarea eliminada con exito");
  } catch (error) {
    console.log(error);
    res.send("Error al borrar la tarea");
  } finally {
    await conexion.end();
  }
};
