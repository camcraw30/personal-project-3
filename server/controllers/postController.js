module.exports = {
    addPost: async function(req, res) {
        const db = req.app.get("db");
        // const post_Id = req.params.post_Id;
        const {post} = req.body;
        const {userId} = req.session.user;
        const posts = await db.posts.addPost(userId, post);
        // console.log(post);
        // if(!post[0]) {
        //     await db.posts.addPost(post);
        // } else {
        //     await db.posts.updatePost(post[0].post + 1, post_Id, userId)
        // }
        res.status(200).json(posts);
    },
    getPosts: async function(req, res) {
        if (!req.session.user) {
            return res.sendStatus(403);
        }
        const {userId} = req.session.user
        const {postId} = req.body;
        const db = req.app.get("db");
        const post = await db.posts.getPosts(userId, postId);
        res.status(200).json(post);
    },
    getCertainPost: async function(req, res) {
        const {postId} = req.body;
        const db = req.app.get("db");
        const post = await db.posts.getCertainPost(postId)
        res.status(200).json(post);
    },
    editPost: async function(req, res) {
        const db = req.app.get("db");
        const {userId} = req.session.user;
        const {post} = req.body;
        const post_id = +req.params.post_id;
        await db.posts.updatePost(post, post_id, userId);
        console.log(post_id);
        console.log(userId);
        console.log(post);
        res.status(200).json(post);
    },
    deletePost: async function(req, res) {
        const db = req.app.get("db");
        const {userId} = req.session.user;
        const post_Id = req.params.post_id

        await db.posts.deletePost(userId, post_Id);

        const post = await db.posts.deletePost(post_Id);
        res.status(200).json(post);
    }
}