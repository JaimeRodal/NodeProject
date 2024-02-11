import getPool from "./getPool.js";
import bcrypt from "bcrypt";

// Creamos una función para generar usuarios en la tabla users
const createUsersEx = async (users) => {
  try {
    console.log("Creando conexión a la base de datos...");
    let pool = await getPool();

    // Recorremos el array de usuarios
    for (const user of users) {
      // Hash de la contraseña para cada usuario
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      // Insertamos cada usuario en la tabla users
      console.log("Insertando usuario en la tabla...");
      await pool.query(`
          INSERT INTO users (name, lastName, email, password, photo) 
          VALUES ('${user.name}', '${user.lastName}', '${user.email}', '${hashedPassword}', '${user.photo}')
      `);
      console.log("Usuario insertado correctamente.");
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Cerrando conexión a la base de datos.");
    process.exit();
  }
};

console.log("Iniciando creación de usuarios en la base de datos...");
const users = [
  {
    name: 'Pablo',
    lastName: 'González',
    email: 'pablo@mail.com',
    password: 'pablo1234',
    photo: 'http://localhost:3000/UserIcon.png'
  },
  {
    name: 'Ana',
    lastName: 'Martínez',
    email: 'ana@mail.com',
    password: 'ana1234',
    photo: 'http://localhost:3000/UserIcon.png'
  },
  {
    name: 'Fran',
    lastName: 'Rodríguez',
    email: 'fran@mail.com',
    password: 'fran1234',
    photo: 'http://localhost:3000/UserIcon.png'
  },
  {
    name: 'Hugo',
    lastName: 'Otero',
    email: 'hugo@mail.com',
    password: 'hugo1234',
    photo: 'http://localhost:3000/UserIcon.png'
  },
  {
    name: 'Jaime',
    lastName: 'Rodal',
    email: 'jaime@mail.com',
    password: 'jaime1234',
    photo: 'http://localhost:3000/UserIcon.png'
  },
];
createUsersEx(users);
