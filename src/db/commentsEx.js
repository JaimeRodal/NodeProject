import getPool from "./getPool.js";

// Creamos una función para generar comentarios en la tabla comments
const createCommentsExp = async (comments) => {
  try {
    console.log("Creando conexión a la base de datos...");
    let pool = await getPool();

    // Recorremos el array de comentarios
    for (const comment of comments) {
      
      // Insertamos cada usuario en la tabla users
      console.log("Insertando comentarios en la tabla...");
      await pool.query(`
          INSERT INTO comments (text, exp_id, user_id) 
          VALUES ('${comment.text}', '${comment.exp_id}', '${comment.user_id}')
      `);
      console.log("Commentario insertado correctamente.");
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Cerrando conexión a la base de datos.");
    process.exit();
  }
};

console.log("Iniciando creación de comentarios en las experiencis en la base de datos...");
const comment = [
  {
    text: "Me encanta!", 
    exp_id: "1", 
    user_id: "3"
  },
  {
    text: "Que chulo! Nosotros hemos reservado para la semana que viene.", 
    exp_id: "2", 
    user_id: "5"
  },
  {
    text: "Hay que tener más cuidado con los casinos JAJAJA", 
    exp_id: "3", 
    user_id: "2"
  },
  {
    text: "Yo tengo muchas ganas de probarlo, a ver si un día nos invitas!", 
    exp_id: "4", 
    user_id: "1"
  },
  {
    text: "Creo que ya sé a donde llevar a mis hijos de vacaciones!", 
    exp_id: "5", 
    user_id: "4"
  }
];
createCommentsExp(comment);
