require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
const authController = require("./controllers/authController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("Good, The Database is Connected")
})

app.post("/auth/user/new", authController.register);
app.post("/auth/user/login", authController.login);
app.post("/auth/user/logout", authController.logout);

app.get("/api/social/posts", postController.getPosts);
app.get("/api/social/post/:id", postController.getCertainPost);
app.post("/api/social/post/add", postController.addPost);
app.put("/api/social/post/:post_id", postController.editPost);
app.delete("/api/social/post/:post_id", postController.deletePost);

app.get("/api/comments", commentController.getComments)
app.post("/api/comments/add", commentController.addComment);
app.put("/api/comments/edit", commentController.editComment);
app.delete("/api/comments/delete", commentController.deleteComment);

app.listen(SERVER_PORT, () => console.log(`Server Listening on ${SERVER_PORT}`));

