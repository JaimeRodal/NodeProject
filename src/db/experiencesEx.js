import { HOST_DB, PORT } from "../../env.js";
import getPool from "./getPool.js";

// Creamos una función para generar tablas dentro de nuestra DB
const createExperiences = async (experiences) => {
  try {
    console.log("Conectando a la base de datos...");
    let pool = await getPool();
    console.log("Conexión exitosa.");

    console.log("Insertando experiencias en la tabla...");
    for (const exp of experiences)
    await pool.query(`
    INSERT INTO experiences (title, subTitle, place, text, photo, user_id, category_id) VALUES ('${exp.title}', '${exp.subTitle}', '${exp.place}', '${exp.text}', '${exp.photo}', '${exp.user_id}', '${exp.category_id}')
    `);

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
const exp = [
  {
    title: 'Aventura por el desierto', 
    subTitle: 'De viaje por Marruecos', 
    place: 'El desierto de Merzouga', 
    text: 'El mes pasado nos fuimos a Marruecos de vacaciones, vimos muchísimos lugares increíbles. Empezamos visitando la plaza de Jemaa el-Fna, la plaza más famosa de la ciudad, pero la verdadera aventura empezó cuando empezamos la ruta hacia el desierto de Merzouga, un lugar árido que pudimos explorar en un 4x4 para acabar pasando una noche bajo las estrellas en un campamento bereber, sin duda repetiremos!', 
    photo: `http://${HOST_DB}:${PORT}/examples/desierto-mezouga.png`, 
    user_id: '1', 
    category_id: '1'
  },
  {
    title: 'Ribeira Sacra al natural', 
    subTitle: 'Paseo por el Río Sil', 
    place: 'Ribeira Sacra', 
    text: 'La semana pasada vivimos un día increíble de excursión por la Ribeira Sacra. Empezamos en el embarcadero de San Estevo, donde tomamos un catamarán a lo largo del Río Sil. Vimos grandes extensiones de viñedos y acantilados casi verticales, un paisaje impresionante. Después visitamos el Mirador de San Estevo, con unas vistas espectaculares. Ya al mediodía llegamos a Allariz, en él nos dejaron tiempo para comer y después tuvimos una visita guiada por el pueblo y al atardecer volvimos a casa.', 
    photo: `http://${HOST_DB}:${PORT}/examples/ribeira-sacra.png`, 
    user_id: '2', 
    category_id: '2'
  },
  {
    title: 'Viaje a Las Vegas', 
    subTitle: 'Esta vez sin resaca', 
    place: 'Las Vegas', 
    text: 'Mis colegas y yo celebramos la despedida de soltero de mi mejor amigo Juan en Las Vegas, lo pasamos de miedo en los casinos, viendo algún espectáculo como el Circo del Sol y un show de magia. Todo iba bien hasta que empezamos a perder en la ruleta, Juan quería seguir, pero conseguimos llevárnoslo de allí, volvió a casa feliz pero sin un duro el pobre...', 
    photo: `http://${HOST_DB}:${PORT}/examples/las-vegas.png`, 
    user_id: '3', 
    category_id: '3'
  },
  {
    title: 'Debut con  el sushi', 
    subTitle: 'Probando nuevas comidas', 
    place: 'A Coruña', 
    text: 'Ayer estuve con mi pareja en el local Sushi Utopía, ha sido mi primera vez probando sushi, algo que me parecía muy mala idea. Empezamos probando los típicos nigiris de salmón y de atún, después probamos unos makis, seguidos de uramakis, que es lo mismo solo que uno tiene el arroz por dentro y otro por fuera. Para finalizar nos pedimos unos baos con unos uramaki de gamba en tempura con cebolla frita (mis favoritos). Al final fue una experiencia interesante, pero no la cambio por un churrasco...', 
    photo: `http://${HOST_DB}:${PORT}/examples/sushi.png`, 
    user_id: '4', 
    category_id: '4'
  },
  {
    title: 'Museo de Historia Natural', 
    subTitle: 'Paseo entre dinosaurios', 
    place: 'Londres', 
    text: 'Fui a visitar a mi prima a Londres y me hizo un pequeño tour por la ciudad, lo que más me gustó fue el Museo de historia Natural, es un lugar impresionante donde hay fósiles de dinosaurio, distintos esqueletos de mamíferos e incluso la recreación de una ballena azul a tamaño real en el techo, lo pasé genial, ojalá poder volver pronto!', 
    photo: `http://${HOST_DB}:${PORT}/examples/museo-historia-natural-londres.png`, 
    user_id: '5', 
    category_id: '8'
  },
]
createExperiences(exp);
