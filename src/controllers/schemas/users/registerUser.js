import Joi from "joi";

// Crear el esquema para el registro del usuario como un objeto Joi
const registerSchema = Joi.object({
  // Definimos los parámetros que se validarán con las caracteríscticas que requiramos
  // name: Joi.string().alphanum().min(3).max(300).required(),
  // lastName: Joi.string().alphanum().min(3).max(30).required(),

  // NOTA: La verificación con este patrón es más concisa, ya que por ejemplo alphanum no permitiría nombres con espacios, ç, - o acentos
  name: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿç\s'-]+$/u)
    .min(2)
    .max(30)
    .required(),

  // NOTA: La verificación con este patrón es más concisa, ya que por ejemplo alphanum no permitiría nombres con espacios, ç, - o acentos
  lastName: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿç\s'-]+$/u)
    .min(2)
    .max(30)
    .required(),

  // email: Joi.string().email({
  //   minDomainSegments: 2,
  //   tlds: { allow: ["com", "net", "es"] },
  // }),

  // NOTA: La verificación estándar es la simple, ya que ésta dejaría fuera algunos correos, como los .org
  email: Joi.string().email().required(),

  // password: Joi.string().required(),

  // NOTA: Para evitar caracteres extraños o que puedan dar problemas, limitamos el password a letras, números y caracteres especiales
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/)
    .required(),

  photoPath: [Joi.string()],
});
// Exportamos el Schema
export default registerSchema;
