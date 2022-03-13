const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts.js");
const commentsCtrl = require("../controllers/comments.js");
const likesCtrl = require("../controllers/likes.js");

const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");

router.post("/", auth, multer, postsCtrl.createPost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.editPost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);

router.post("/:postId/comment", auth, commentsCtrl.createComment);
router.get("/:postId/comment/:id", auth, commentsCtrl.getOneComment);
router.get("/:postId/comments", auth, commentsCtrl.getAllComments);
router.put("/:postId/comment/:id", auth, commentsCtrl.editComment);
router.delete("/:postId/comment/:id", auth, commentsCtrl.deleteComment);

router.post("/:postId/like", auth, likesCtrl.createLike);
router.get("/:postId/like/:likeId", auth, likesCtrl.getOneLike);
router.get("/:postId/like", auth, likesCtrl.getAllLike);

module.exports = router;
