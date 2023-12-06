import getPool from "../../db/getPool.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos la función que buscará las experiencias y nos las devolverá todas las experiencias ordenadas de la más nueva a la más antigua
const webController = async (req, res) => {
  const [exp] = await pool.query(`
    SELECT * FROM experiences ORDER BY createdAt DESC
    `);

  res.send({
    status: "ok",
    data: exp,
  });
};

export default webController;
