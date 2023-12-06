import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getPool from "../../db/getPool.js";
import { TOKEN_SECRET } from "../../../env.js";

const pool = await getPool();

const login = async (req, res) => {
  const { email, password } = req.body;
  const [result] = await pool.query(`SELECT * FROM users WHERE email=?`, [
    email,
  ]);

  const userFound = result[0];

  if (!userFound) {
    res.status(401).json({
      error: "Usuario no registrado",
    });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, result[0].password);

  if (!passwordMatch) {
    res.status(400).json({
      error: "Email o contraseña incorrectas",
    });
    return;
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
};

export default login;
