import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getPool from "../../db/getPool.js";
import { TOKEN_SECRET } from "../../../env.js";
import genError from "../../utils/helpers.js";

const pool = await getPool();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [result] = await pool.query(`SELECT * FROM users WHERE email=?`, [
      email,
    ]);

    const userFound = result[0];

    if (!userFound) {
      throw genError("Usuario no registrado", 401);
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);

    if (!passwordMatch) {
      throw genError("Email o contraseña incorrectas", 400);
    }

    const token = jwt.sign(
      {
        id: userFound.id,
        name: userFound.name,
      },
      TOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(200).json({
      message: "Bienvenid@",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default login;
