import getPool from "../../db/getPool.js";

// Importamos e usamos el gestor de conexión a la DB
const pool = await getPool();

// Creamos la función que buscará las experiencias y nos las devolverá todas las experiencias ordenadas de la más nueva a la más antigua
const webController = async (req, res) => {
  const [exp] = await pool.query(`
  SELECT 
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
        users cu ON c.user_id = cu.id
    GROUP BY
        exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name, u.name, u.photo;



    `);

  // Respuesta
  res.send({
    status: "Correcto",
    data: exp,
  });
};

export default webController;
