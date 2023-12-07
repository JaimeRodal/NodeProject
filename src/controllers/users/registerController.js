import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import sendMailUtil from "../../utils/sendMail.js";
const pool = await getPool();

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  const [[emailExists]] = await pool.query(
    `SELECT * FROM users WHERE email=?`,
    [email]
  );

  if (emailExists) {
    res.status(400).json({
      error: "El email ya esta en uso",
    });
  }

  // Hasheando el password

  const hashedPass = await bcrypt.hash(password, 5);
  await pool.query(
    `INSERT INTO users (name, lastName, email,password) VALUES (?,?,?,?)`,
    [name, lastName, email, hashedPass]
  );

  //Nodemailer para los que se registren
  const emailSubject = "Cuenta registrada";
  const emailBody = `<h1> Bienvenid@ ${name}! 😄
    Esperamos que encuentre los que busca y tenga una experiencia positiva 😎`;

  // Hacemos la funcion para mandar el mail
  await sendMailUtil(email, emailSubject, emailBody);
  res.status(200).json({
    message: "Usuario creado con exito!",
  });
};

export default register;
