import getPool from "../../db/getPool.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos la función que buscará las experiencias y nos las devolverá todas las experiencias ordenadas de la más nueva a la más antigua
const webController = async (req, res) => {
  const [exp] = await pool.query(`
    SELECT exp.title,exp.subTitle,exp.place,exp.text, exp.photo, cat.name FROM experiences exp, categories cat WHERE exp.category_id = cat.id ORDER BY exp.createdAt DESC
    `);

  // Respuesta
  res.send({
    status: "Correcto",
    data: exp,
  });
};

export default webController;
