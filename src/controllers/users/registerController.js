import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import sendMailUtil from "../../utils/sendMail.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Definimos una función de registro de usuarios en la DB
const register = async (req, res, next) => {
  try {
    // Obtenemos los parámetros necesarios para el registro del body de la petición
    const { name, lastName, email, password } = req.body;
    // Comprobamos si ya existe un usuario registrado con el mismo email que la petición, ya que el email debe ser ÚNICO
    const [[emailExists]] = await pool.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );

    // De existir un usuario con el mismo email, generar un error con mensaje
    if (emailExists) {
      throw genError("El email ya esta en uso", 400);
    }

    // Si no existe coincidencia con otro usuario en los puntos anteriores, cogemos el parámetro password y lo hasheamos, es decir lo volvemos ilegible para que nadie que no sea el propio usuario pueda saberla
    const hashedPass = await bcrypt.hash(password, 5);
    // Una vez ocultada la password, procedemos a introducir los datos del usuario a nuestra DB
    await pool.query(
      `INSERT INTO users (name, lastName, email,password) VALUES (?,?,?,?)`,
      [name, lastName, email, hashedPass]
    );

    //Uso de nodemailer (Ver explicación en: 'src/utils/sendMail.js')
    const emailSubject = "Cuenta registrada";
    const emailBody = `<h1> Bienvenid@ ${name}! 😄
    Esperamos que encuentre los que busca y tenga una experiencia positiva 😎`;

    // LLamamos a la función para mandar el email
    await sendMailUtil(email, emailSubject, emailBody);
    res.status(200).json({
      status: "Correcto",
      message: "Usuario creado con exito!",
    });
  } catch (error) {
    next(error);
  }
};

// Exportamos la función
export default register;
