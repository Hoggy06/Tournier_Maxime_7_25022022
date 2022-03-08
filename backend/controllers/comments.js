const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Posts = require("../models/Posts.js")(sequelize, DataTypes);
const Comments = require("../models/Comments.js")(sequelize, DataTypes);
exports.createComment = (req, res, next) => {
  Comments.create({
    message: req.body.message,
    postId: req.params.postId,
    userId: req.auth.userId,
  })
    .then((comment) => {
      Comments.findAll({
        where: { id: comment.id },
        include: [
          { model: Posts, where: { id: req.params.postId }, required: false },
        ],
      });

      res.status(201).json({ comment });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.getAllComments = (req, res, next) => {
  const options = {
    limit: 10,
    order: [["id", "DESC"]],
    attributes: ["id", "userId", "postId", "message", "created"],
  };
  Comments.findAll(options)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: "Impossible de retrouver les commentaires" });
    });
};

exports.getOneComment = (req, res, next) => {
  const options = {
    where: { postId: req.params.postId },
    attributes: ["id", "userId", "postId", "message", "created"],
  };
  Comments.findOne(options)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch(() => {
      res.status(404).json({ error: "Commentaire non trouvé" });
    });
};

exports.editComment = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      }
      comment
        .update({ message: req.body.message, id: req.params.id })
        .then(() => res.status(200).json({ message: "Commentaire modifié" }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteComment = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      } else {
        comment.destroy();
        res.status(200).json({ message: "Commentaire supprimé" });
      }
    })
    .catch(() => {
      res.status(404).json({ error: "Post non trouvé" });
    });
};
