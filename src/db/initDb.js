import getPool from "./getPool.js";

const create = async () => {
  try {
    let pool = await getPool();

    console.log("Borrando tablas...");
    await pool.query(
      "DROP TABLE IF EXISTS users,locations,experiences, photos"
    );

    console.log("Creando tabla users...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(64) UNIQUE,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(64) NOT NULL,
            profilePictureURL VARCHAR(255),
        );
        `);

    console.log("Creando tabla locations...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS locations (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            streetAddress VARCHAR(255),
            subLocality VARCHAR(255),
            city VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL
        );
        `);

    console.log("Creando tabla experiences...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS experiences (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            description TEXT NOT NULL,
            locationId INT UNSIGNED NOT NULL,
            ownerId INT UNSIGNED NOT NULL,
            publishedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (locationId) REFERENCES locations(id),
            FOREIGN KEY (ownerId) REFERENCES users(id)
        );
        `);
    console.log("Creando tabla photos...");
    await pool.query(`
        CREATE TABLE IF NOT EXISTS photos (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            experienceId INT UNSIGNED NOT NULL,
            
            FOREIGN KEY (experienceId) REFERENCES experiences(id)
        );
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
