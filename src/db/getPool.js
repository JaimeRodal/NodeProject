import mysql from "mysql2/promise";
import { HOST_DB, USER_DB, PASSWORD_DB, PORT_DB, NAME_DB } from "../../env.js";

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      const poolTemporal = mysql.createPool({
        host: HOST_DB,
        user: USER_DB,
        password: PASSWORD_DB,
        port: PORT_DB,
      });
      await poolTemporal.query(`CREATE DATABASE IF NOT EXISTS ${NAME_DB} `);

      pool = mysql.createPool({
        host: HOST_DB,
        user: USER_DB,
        password: PASSWORD_DB,
        port: PORT_DB,
        database: NAME_DB,
      });
    }
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export default getPool;
