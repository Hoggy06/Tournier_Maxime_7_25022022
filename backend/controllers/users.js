const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Users = require("../models/Users.js")(sequelize, DataTypes);
const Posts = require("../models/Posts.js")(sequelize, DataTypes);
const Comments = require("../models/Comments.js")(sequelize, DataTypes);
const fs = require("fs");

exports.editUser = (req, res, next) => {
  Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      }
      const userObject = req.file
        ? {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            avatar: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      user
        .update({
          ...userObject,
          id: req.params.id,
        })
        .then(() => res.status(200).json({ message: "Profil modifié" }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneUser = (req, res, next) => {
  Posts.belongsTo(Users);
  Comments.belongsTo(Users);
  Users.hasMany(Posts);
  Users.hasMany(Comments);
  const options = {
    where: { id: req.params.id },
    attributes: ["id", "firstname", "lastname", "avatar", "created"],
    include: [
      {
        model: Posts,
        attributes: ["id", "message", "image", "created", "updated"],
      },
      {
        model: Comments,
        attributes: ["id", "postId", "message", "created", "updated"],
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

exports.getAllUsers = (req, res, next) => {
  Posts.belongsTo(Users);
  Comments.belongsTo(Users);
  Users.hasMany(Posts);
  Users.hasMany(Comments);
  const options = {
    limit: 10,
    order: [["id", "DESC"]],
    attributes: ["id", "firstname", "lastname", "avatar", "created"],
    include: [
      {
        model: Posts,
        attributes: ["id", "message", "image", "created", "updated"],
      },
      {
        model: Comments,
        attributes: ["id", "postId", "message", "created", "updated"],
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

exports.deleteOneUser = (req, res, next) => {
  Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId) {
        return res.status(403).json({ error: "Accès non autorisé" });
      } else {
        user.destroy();
        res.status(200).json({ message: "Compte supprimé" });
      }
    })
    .catch(() => {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    });
};
