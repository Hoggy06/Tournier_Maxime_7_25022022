const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Posts = require("../models/Posts.js")(sequelize, DataTypes);
const Users = require("../models/Users.js")(sequelize, DataTypes);
const fs = require("fs");
exports.createPost = (req, res, next) => {
  Posts.belongsTo(Users);
  Users.hasMany(Posts);
  const postObject = req.file
    ? {
        message: req.body.message,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Posts.create({
    ...postObject,
    userId: req.auth.userId,
  });
  Posts.findAll({
    include: {
      model: Users,
      attributes: ["firstname", "avatar"],
    },
  })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllPosts = (req, res, next) => {
  Posts.belongsTo(Users);
  Users.hasMany(Posts);
  const options = {
    limit: 10,
    order: [["id", "DESC"]],
    attributes: ["id", "message", "image", "userId", "created"],
    include: {
      model: Users,
      attributes: ["firstname", "avatar"],
    },
  };
  Posts.findAll(options)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(404).json({ error: "Impossible de retrouver les posts" });
    });
};

exports.getOnePost = (req, res, next) => {
  Posts.belongsTo(Users);
  Users.hasMany(Posts);
  const options = {
    where: { id: req.params.id },
    attributes: ["id", "message", "image", "userId", "created"],
    include: {
      model: Users,
      attributes: ["firstname", "avatar"],
    },
  };
  Posts.findOne(options)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(404).json({ error: "Post non trouvé" });
    });
};

exports.editPost = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      }
      const postObject = req.file
        ? {
            message: req.body.message,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      post
        .update({ ...postObject, id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifié" }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      } else {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          post.destroy();
          res.status(200).json({ message: "Post supprimé" });
        });
      }
    })
    .catch(() => {
      res.status(404).json({ error: "Post non trouvé" });
    });
};
