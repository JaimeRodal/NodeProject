// Importamos nuestras dependencias
import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from "../../env.js";

// Preparando el transporte de nuestro correo
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

// Realizar el envío del correo al usuario
const sendMailUtil = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: subject,
      text: body,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("ERRORAAAASO PAPÁ" + error);
  }
};

export default sendMailUtil;
