import express from "express";
import fileUpload from "express-fileupload";
import getPool from "../../db/getPool.js";
import bcrypt from "bcrypt";
import genError from "../../utils/helpers.js";

const app = express();
const pool = await getPool();

//Usando express para subir alguna foto si quieren modificarla

app.use(fileUpload({ createParentPath: true }));

//Funcion para modificar los datos
const modify = async (req, res, next) => {
  try {
    //Guardamos el id del usuario autenticado con el token en una constante
    const authUserId = req.auth;
    //Guardamos el id del usuario del que quiere modificar los datos
    const modUser = req.params.id;
    //Comprobamos que los 2 ids coinciden, si no es asi lanza un error
    if (authUserId !== modUser) {
      throw genError("No tienes permisos para editar este usuario", 403);
    }

    //Guardamos la respuesta del body con los datos que nos interesa poder modificar
    const { name, lastName, email, password } = req.body;

    //Verificamos que hayan querido actualizar la foto
    let photoPath = null;
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const finalFileName = Date.now() + "-" + avatar.name;
      avatar.mv(`../../uploads/${finalFileName}`);
      photoPath = `../../uploads/${finalFileName}`;
    }

    //Hasheamos la pass si se pide
    let hashedPass = null;
    if (password) {
      hashedPass = await bcrypt.hash(password, 5);
    }

    //Aqui incluimos la consulta a la base de datos para actualizar los valores
    let updateQuery = "UPDATE users SET";
    const values = [];

    if (name) {
      updateQuery += "name=?, ";
      values.push(name);
    }

    if (lastName) {
      updateQuery += "lastName=?, ";
      values.push(lastName);
    }

    if (email) {
      updateQuery += "email=?, ";
      values.push(email);
    }

    if (hashedPass) {
      updateQuery += "password=?, ";
      values.push(hashedPass);
    }

    if (photoPath) {
      updateQuery += "photo=?, ";
      values.push(photoPath);
    }

    //Eliminamos la coma del query de la ultima actualizacion que se haga
    updateQuery = updateQuery.slice(0, -2);

    //Metemos la ultima query para que se cambie solo al usuario con ese id
    updateQuery += " WHERE id=?";
    values.push(id);

    //Ejecutamos la actualizacion
    await pool.query(updateQuery, values);

    res.status(200).json({
      message: "Usuario modificado!",
    });
  } catch (error) {
    next(error);
  }
};

export default modify;
