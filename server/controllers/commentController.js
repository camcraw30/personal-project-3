module.exports = {
    getComments: async (req, res) => {
        const db = req.app.get('db');

        let comments;
        try {
            comments = await db.comments.getComments();
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Could not find any comments'});
        }

        res.status(200).json(comments);
    },
    addComment: async (req, res) => {
        const {comment_id, comment} = req.body;
        const {userId} = req.session.user;
        const db = req.app.get('db');
        console.log(req.body)
        console.log(userId)

        const comments = await db.comments.addComment(comment_id, userId, comment);

        res.status(200).json(comments)
    },
    editComment: async (req, res) => {
        const { editedComment } = req.body; 
        const postId = +req.params.postId;
        const commentId = +req.params.commentId;
        const {userId} = req.session.user;
        const db = req.app.get('db');

        const comments = await db.comments.editComment(commentId, postId, userId, editedComment); 

        res.status(200).json(comments)
    },
    deleteComment: async (req, res) => {
        const postId = +req.params.postId;
        const commentId = +req.params.commentId;
        const {userId} = req.session.user;
        const db = req.app.get('db');

        const comments = await db.comments.deleteComment(postId, commentId, userId);

        res.status(200).json(comments)
    }
}