// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Guardamos en una variable el gestor de conexiones a la DB
const pool = await getPool();
// Creamos una función para manejar los votos de las experiencias
const votesController = async (req, res, next) => {
  try {
    // Obtenemos lo parámetros necesarios
    const { id } = req.params;
    const userAuth = req.auth;

    // Comprobamos si el usuario está registrado
    if (!userAuth) {
      throw genError("No estás registrado", 401);
    }

    // Comprobamos si la experiencia existe
    const [[experience]] = await pool.query(
      `
      SELECT * FROM experiences WHERE id = ?
    `,
      [id]
    );

    // Si la experiencia no existe, generamos un error
    if (!experience) {
      throw genError("La experiencia que intentas votar no existe", 404);
    }

    //   Comprobamos si el voto existe pasándole los datos necesarios
    const [result] = await pool.query(
      `
    SELECT * FROM votes WHERE user_id = ? AND exp_id = ?
  `,
      [userAuth, id]
    );
    console.log(result);
    //   En caso de existir, borrarlo
    if (result.length > 0) {
      // Lo borramos de la tabla votes
      await pool.query(
        `
        DELETE FROM votes WHERE user_id = ? AND exp_id = ?
    `,
        [userAuth, id]
      );
      // Comprobamos el contador de votos de la experiencia
      const [[votesStatus]] = await pool.query(
        `
    SELECT COUNT(exp_id) AS contador FROM votes WHERE exp_id = ?
    `,
        [id]
      );
      console.log(votesStatus);
      // Respuesta
      res.send({
        status: "Correcto",
        message: `Has retirado el voto, Votos actuales: ${votesStatus.contador}`,
        data: result,
      });
    } else {
      // De no existir el voto, lo añadimos
      await pool.query(
        `
        INSERT INTO votes (user_id, exp_id, isLiked) VALUES (?,?,?)
  `,
        [userAuth, id, 1]
      );
      // Comprobamos el contador de votos de la experiencia
      const [[votesStatus]] = await pool.query(
        `
    SELECT COUNT(exp_id) AS contador FROM votes WHERE exp_id = ?
    `,
        [id]
      );
      // Respuesta
      res.send({
        status: "Correcto",
        message: `Has votado correctamente, Votos actuales: ${votesStatus.contador}`,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default votesController;
