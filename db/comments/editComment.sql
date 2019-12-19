UPDATE comments
SET comment = $1
WHERE post_id = $2 AND user_id = $3;