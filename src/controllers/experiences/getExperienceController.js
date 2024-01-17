// Importaciones
import getPool from "../../db/getPool.js";
import genError from "../../utils/helpers.js";

// Definimos el gestor de conexiones a la DB
const pool = await getPool();

// Creamos una función donde manejaremos la búsqueda por "id" de una experiencia en concreto
const getExperienceController = async (req, res, next) => {
  try {
    // Obtenemos la "id" de la experiencia que pretendemos buscar para su uso
    const { id } = req.params;

    // Realizamos la búsqueda en DB de la experiencia pasándole el parámetro anterior como condición

    const query_select = `SELECT 
    exp.title,
    exp.subTitle,
    exp.place,
    exp.text,
    exp.photo,
    cat.name AS category_name,
    COALESCE(COUNT(v.exp_id), 0) AS likes,
    u.name AS user_name,
    u.photo AS user_photo,
    CONCAT(
        '[',
        GROUP_CONCAT(
            CONCAT(
                '{"comment_text":"', c.text, '", "comment_user":"', cu.name, '", "answers": ',
                COALESCE(
                    (SELECT 
                        CONCAT(
                            '[',
                            GROUP_CONCAT(
                                CONCAT(
                                    '{"answer_text":"', ans.text, '", "answer_user":"', au.name, '"}'
                                )
                                ORDER BY ans.id
                                SEPARATOR ','
                            ),
                            ']'
                        )
                    FROM answerComments ans
                    JOIN users au ON ans.user_id = au.id
                    WHERE ans.comment_id = c.id),
                    '[]'
                ),
                '}'
            )
            ORDER BY c.id
            SEPARATOR ','
        ),
        ']'
    ) AS comments_and_answers
        FROM 
            experiences exp
        JOIN 
            categories cat ON exp.category_id = cat.id 
        JOIN 
            users u ON exp.user_id = u.id
        LEFT JOIN 
            votes v ON exp.id = v.exp_id
        LEFT JOIN 
            comments c ON exp.id = c.exp_id
        LEFT JOIN 
            answerComments ans ON c.id = ans.comment_id
        LEFT JOIN 
            users cu ON c.user_id = cu.id
        LEFT JOIN 
            users au ON ans.user_id = au.id`;

    const query_one_experience = "WHERE exp.id = ?";
    const query = query_select + "\n" + query_one_experience;

    const [[getId]] = await pool.query(query, [id]);

    // En caso de no haber ninguna experiencia con la "id" que solicitamos, generamos el siguiente mensaje de error
    if (!getId || getId.title === null) {
      throw genError("No hay coincidencias en tu búsqueda", 404);
    }

    // Respuesta
    res.send({
      status: "Correcto",
      data: getId,
    });
  } catch (error) {
    // En caso de error pasamos el error al middleware de gestión de errores
    next(error);
  }
};

// Exportaciones
export default getExperienceController;
