import getPool from "./getPool.js";

// Creamos una función para generar tablas dentro de nuestra DB
const create = async () => {
  try {
    let pool = await getPool();

    // En caso de ya existir, borramos las tablas antes de crear unas nuevas
    console.log("Borrando tablas...");
    await pool.query(
      "DROP TABLE IF EXISTS votes, answerComments, comments, experiences, categories, users"
    );

    // Una vez borradas, las volvemos a crear
    console.log("Creando tabla users...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            photo VARCHAR(500),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP            
        )
        `);

    console.log("Creando tabla categorías...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )`);

    console.log("Creando tabla experiences...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS experiences (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            subTitle VARCHAR(50) NOT NULL,
            place VARCHAR(50) NOT NULL,
            text VARCHAR(500) NOT NULL,
            photo VARCHAR(500),
            user_id INT NOT NULL,
            category_id INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
        )
        `);

    console.log("Creando tabla commentarios...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            text VARCHAR(200) NOT NULL,
            exp_id INT NOT NULL,
            user_id INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(exp_id) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        `);

    console.log("Creando tabla respuestas de comentarios...");
    await pool.query(`
            CREATE TABLE IF NOT EXISTS answerComments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                text VARCHAR(200) NOT NULL,
                comment_id INT NOT NULL,
                user_id INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `);

    console.log("Creando tabla votos...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS votes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            exp_id INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(exp_id) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        `);
    console.log("Insertando valores iniciales a categorías...");
    await pool.query(`
        INSERT INTO categories (name) VALUES
            ('Aventura'),
            ('Naturaleza'),
            ('Viajes'),
            ('Comida'),
            ('Tecnología'),
            ('Historia'),
            ('Arte'),
            ('Ciencia'),
            ('Música'),
            ('Deportes');
        `);
    await pool.end();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

//Aquí ejecutamos la función para crear la base de datos con las tablas
create();

// Propuesta: insertar datos por defecto en la tabla categorías para poder insertar experiencias desde el principio.
// Si hacemos la gestión de las mismas en el frontend, ahí ya el usuario puede cambiar los nombres, borrar o insertar
/*
 */
