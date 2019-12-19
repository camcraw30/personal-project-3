SELECT * FROM comments
INNER JOIN posts
ON posts.comment_id = comments.comment_id
WHERE post_id = $1;