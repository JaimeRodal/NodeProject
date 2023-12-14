import Joi from "joi";

// Crear el esquema del Login como un objeto Joi
const loginSchema = Joi.object({

// Definimos los parámetros que se validarán con las caracteríscticas que requiramos
email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } }),

password: Joi.string().required(),

});
// Exportamos el Schema
export default loginSchema; 