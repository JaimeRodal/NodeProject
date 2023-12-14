import Joi from "joi";

// Crear el esquema para la modificación del usuario como un objeto Joi
const modifyUserSchema = Joi.object({

// Definimos los parámetros que se validarán con las caracteríscticas que requiramos
name: Joi.string().alphanum().min(3).max(300),

lastName: Joi.string().alphanum().min(3).max(30),

email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } }),

password: Joi.string(),

photoPath: [Joi.string()],

});
// Exportamos el Schema
export default modifyUserSchema; 