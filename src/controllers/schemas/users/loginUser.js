import Joi from "joi";

// Crear el esquema del Login como un objeto Joi
const loginSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  // email: Joi.string().email({    minDomainSegments: 2,    tlds: { allow: ["com", "net", "es"] },  }),

  // NOTA: La verificación estándar es la simple, ya que ésta dejaría fuera algunos correos, como los .org
  email: Joi.string().email().required(),

  // password: Joi.string().required(),

  // NOTA: Para evitar caracteres extraños o que puedan dar problemas, limitamos el password a letras, números y caracteres especiales
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/)
    .required(),
});
// Exportamos el Schema
export default loginSchema;
