// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función donde manejaremos la búsqueda por "id" de una experiencia en concreto
const getExperienceController = async (req, res, next) => {
  try {
    // Obtenemos la "id" de la experiencia que pretendemos buscar para su uso
    const { id } = req.params;

    // Realizamos la búsqueda en DB de la experiencia pasándole el parámetro anterior como condición
    const [[getId]] = await pool.query(
      `
        SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name FROM experiences exp, categories cat WHERE exp.id = ?
  `,
      [id]
    );

    // En caso de no haber ninguna experiencia con la "id" que solicitamos, generamos el siguiente mensaje de error
    if (!getId) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    // Respuesta
    res.send({
      status: "Correcto",
      data: getId,
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default getExperienceController;
