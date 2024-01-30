import getPool from "../../db/getPool.js";

const pool = await getPool();

const getVotesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.auth;

    const sqlQuery = `SELECT * FROM votes WHERE user_id = ? AND exp_id = ?`;

    const sqlValues = [user_id, id];

    const [query] = await pool.query(sqlQuery, sqlValues);
    console.log(query);

    if (!query) {
      res.send({ status: "Correcto", data: query });
    }

    res.send({
      status: "Correcto",
      data: query,
    });
  } catch (error) {
    next(error);
  }
};

export default getVotesController;
