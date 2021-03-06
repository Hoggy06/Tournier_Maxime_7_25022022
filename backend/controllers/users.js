const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Users = require("../models/Users.js")(sequelize, DataTypes);
const Posts = require("../models/Posts.js")(sequelize, DataTypes);
const Comments = require("../models/Comments.js")(sequelize, DataTypes);
const Likes = require("../models/Likes.js")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const fs = require("fs");
//Edition d'un utilisateur
exports.editUser = (req, res, next) => {
  Users.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      //On doit etre propriétaire pour pouvoir éditer
      if (user.id !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      }
      const userObject = req.file
        ? //Si édition du profil avec un fichier image
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : //sinon on edite le reste
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
          };

      user
        .update({
          ...userObject,
          id: req.params.id,
        })
        .then(() =>
          res
            .status(200)
            .json({ message: "Votre profil a été modifié avec succès !" })
        )
        .catch(() => {
          res.status(400).json({ error: "Une erreur s'est produite" });
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
//Recherche d'un utilisateur
exports.getOneUser = (req, res, next) => {
  Posts.belongsTo(Users);
  Comments.belongsTo(Users);
  Likes.belongsTo(Users);
  Users.hasMany(Posts);
  Users.hasMany(Comments);
  Users.hasMany(Likes);
  const options = {
    where: { id: req.params.id },
    attributes: [
      "id",
      "firstname",
      "lastname",
      "image",
      "email",
      "isAdmin",
      "created",
    ],
    include: [
      {
        model: Posts,
        attributes: ["id", "message", "image", "created", "updated"],
      },
      {
        model: Comments,
        attributes: ["id", "postId", "message", "created", "updated"],
      },
      {
        model: Likes,
        attributes: ["id", "userId", "postId", "isLike", "created"],
      },
    ],
  };
  Users.findOne(options)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(() => {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};
//Recherche de plusieurs utilisateurs
exports.getAllUsers = (req, res, next) => {
  Posts.belongsTo(Users);
  Comments.belongsTo(Users);
  Likes.belongsTo(Users);
  Users.hasMany(Posts);
  Users.hasMany(Comments);
  Users.hasMany(Likes);
  const options = {
    order: [["id", "DESC"]],
    attributes: ["id", "firstname", "lastname", "image", "isAdmin", "created"],
    include: [
      {
        model: Posts,
        attributes: ["id", "message", "image", "created", "updated"],
      },
      {
        model: Comments,
        attributes: ["id", "postId", "message", "created", "updated"],
      },
      {
        model: Likes,
        attributes: ["id", "userId", "postId", "isLike", "created"],
      },
    ],
  };

  Users.findAll(options)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch(() =>
      res.status(404).json({ error: "Impossible de trouver les utilisateurs" })
    );
};
//Suppression d'un utilisateur et de tous ses contenus
exports.deleteOneUser = (req, res, next) => {
  Likes.destroy({ where: { userId: req.params.id } })
    .then(() =>
      Comments.destroy({ where: { userId: req.params.id } }).then(() =>
        Posts.findAll({ where: { userId: req.params.id } })
          .then((posts) => {
            posts.forEach((post) => {
              Comments.destroy({ where: { postId: post.id } });
              Likes.destroy({ where: { postId: post.id } });
              const filename = post.image;
              fs.unlink(`images/${filename}`, () => {
                Posts.destroy({ where: { id: post.id } });
              });
            });
          })
          .then(() =>
            Users.findOne({ where: { id: req.params.id } }).then((user) => {
              const filename = user.image;
              fs.unlink(`images/${filename}`, () => {
                Users.destroy({ where: { id: req.params.id } }).then(() =>
                  res.status(200).json({ message: "Compte supprimé !" })
                );
              });
            })
          )
      )
    )
    .catch((error) => res.status(400).json({ error }));
};
