// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función para obtener todas las categorías con sus respectivos id y nombres
const getCategoriesController = async (req, res, next) => {
  try {
    // Consultamos la base de datos para obtener todas las categorías
    const query_select = "SELECT id, name FROM categories";
    const categories = await pool.query(query_select);

    // En caso de no haber ninguna categoría, generamos el siguiente mensaje de error
    if (!categories || categories.length === 0) {
      throw genError("No hay categorías disponibles", 404);
    }

    // Respuesta
    res.send({
      status: "Correcto",
      data: categories,
    });
  } catch (error) {
    // En caso de error, pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default getCategoriesController;
