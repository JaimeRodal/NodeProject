import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos una función de filtrado donde busca y extrae las coincidencias en las experiencias publicadas buscando en lugares y categorías
const filterController = async (req, res, next) => {
  try {
    // Definimos en una variable el parametro de búsqueda recibido para su uso
    const searchText = req.params.text;

    // Creamos una petición a la DB pasándole el parámetro anterior
    const [filter] = await pool.query(
      `
      SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name FROM experiences exp, categories cat WHERE exp.category_id = cat.id AND (exp.place LIKE ? OR cat.name LIKE ?)

    `,
      [`%${searchText}%`, `%${searchText}%`]
    );

    // En caso de no haber ninguna coincidencia de búsqueda genera mensaje de error
    if (!filter || filter.length === 0) {
      throw genError("No hay ninguna coincidencia", 401);
    }

    // Respuesta
    res.send({
      status: "Correcto",
      data: filter,
    });
  } catch (error) {
    next(error);
  }
};

// Exportamos la función
export default filterController;
