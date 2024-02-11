import { HOST_DB, PORT } from "../../env.js";
import getPool from "./getPool.js";

// Creamos una función para generar tablas dentro de nuestra DB
const createExperiences = async () => {
  try {
    console.log("Conectando a la base de datos...");
    let pool = await getPool();
    console.log("Conexión exitosa.");

    console.log("Insertando experiencias en la tabla...");
    await pool.query(`
    INSERT INTO experiences (title, subTitle, place, text, photo, user_id, category_id) VALUES
        ('Aventura por el desierto', 'De viaje por Marruecos', 'El desierto de Merzouga', 'El mes pasado nos fuimos a Marruecos de vacaciones, vimos muchísimos lugares increíbles. Empezamos visitando la plaza de Jemaa el-Fna, la plaza mas famosa de la ciudad, pero la verdadera aventura empezó cuando empezamos la ruta hacia el desierto de Merzouga, un lugar árido que pudimos explorar en un 4x4 para acabar pasando una noche bajo las estrellas en un campamento bereber, sin duda repetiremos!', 'http://${HOST_DB}:${PORT}/examples/desierto-mezouga.png', 1, 1),
        ('Paseo por el Río Sil', 'Ribeira Sacra al natural', 'Ribeira Sacra', 'La semana pasada vimimos un día increíble de excursión por la Ribeira Sacra. Empezamos en el embarcadero de San Estevo, donde tomamos un catamaran a lo largo del Río Sil. Vimos grandes extensiones de viñedos y acantilados casi verticales, un paisaje impresionante. Después visitamos el Mirador de San Estevo, con unas vistas espectaculares. Ya al mediodía llegamos a Allariz, en el nos dejaron tiempo para comer y después tuvimos una visita guiada por el pueblo y al atardecer volvimos a casa.', 'http://${HOST_DB}:${PORT}/examples/ribeira-sacra.png', 2, 2),
        ('Viaje a Las Vegas', 'Esta vez sin resaca', 'Las Vegas', 'Mis colegas y yo celebramos la despedida de soltero de mi mejor amigo Juan en Las Vegas, lo pasamos de miedo en los casinos, viendo algún espectáculo como el Circo del Sol y un show de magia. todo iba bien hasta que empezamos a perder en la ruleta, Juan quería seguir pero conseguimos llevárnoslo de allí, volvió a casa feliz pero sin un duro el pobre.', 'http://${HOST_DB}:${PORT}/examples/las-vegas.png', 3, 3),
        ('Debut con  el sushi', 'Probando nuevas comidas', 'A Coruña', 'Ayer estuve con mi pareja en el local Sushi Utopía, ha sido mi primera vez probando sushi, algo que me parecía muy mala idea. Empezamos probando los típicos nigiris de salmón y de atún, después probamos unos makis, seguidos de uramakis, que es lo mismo solo que uno tiene el arroz por dentro y otro por fuera. Para finalizar nos pedimos unos baos con unos uramaki de gamba en tempura con cebolla frita (mis favoritos). Al final fué una experiencia interesante, pero no la cambio por un churrasco...', 'http://${HOST_DB}:${PORT}/examples/sushi.png', 4, 4),
        ('Museo de Historia Natural', 'Paseo entre dinosaurios', 'Londres', 'Fuí a visitar a mi prima a Londres y me hizo un pequeño tour por la ciudad, lo que más me gustó fué el Museo de historia Natural, es un lugar impresionante donde hai fósiles de dinosaurio, distintos esqueletos de mamíferos e incluso la recreación de una ballena azul a tamaño real en el techo, lo pasé genial, ojalá poder volver pronto!', 'http://${HOST_DB}:${PORT}/examples/museo-historia-natural-londres.png', 5, 5)`);
    console.log("Experiencias insertadas correctamente.");

    console.log("Cerrando conexión...");
    await pool.end();
    console.log("Conexión cerrada exitosamente.");
  } catch (error) {
    console.error("Error durante la inserción de experiencias:", error);
  } finally {
    console.log("Saliendo del proceso...");
    process.exit();
  }
};

console.log("Iniciando proceso para crear experiencias...");
createExperiences();
