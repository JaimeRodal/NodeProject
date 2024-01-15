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
                      '{"comment_text":"', c.text, '", "comment_user":"', cu.name, '", "answer_text":"', ans.text, '", "answer_user":"', au.name, '"}'
                  )
                  ORDER BY c.id, ans.id
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
                  users au ON ans.user_id = au.id
                  WHERE 
                  exp.place LIKE '%Gaza%' OR cat.name LIKE '%Gaza%' OR exp.title LIKE '%Gaza%' OR exp.subTitle LIKE '%Gaza%' OR exp.text LIKE '%Gaza%' OR u.name LIKE '%Gaza%'
              GROUP BY
                  exp.title, exp.subTitle, exp.place, exp.text, exp.photo, cat.name, u.name, u.photo
              ORDER BY 
                  likes ASC -- AQUI