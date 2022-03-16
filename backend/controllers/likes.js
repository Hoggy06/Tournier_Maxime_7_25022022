const dotenv = require("dotenv");
dotenv.config();
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");
const Posts = require("../models/Posts.js")(sequelize, DataTypes);
const Likes = require("../models/Likes.js")(sequelize, DataTypes);

exports.createLike = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const postId = req.params.postId;

    const post = await Posts.findByPk(postId);
    if (!post) throw { message: "Post non trouvé" };

    const alreadyLiked = await Likes.findOne({
      where: { userId, postId },
    });

    if (alreadyLiked) {
      await alreadyLiked.destroy();
      res.status(201).send({ like: "Like enlevé" });
    } else {
      await Likes.create({ postId, userId, isLike: true });
      res.status(200).send({ like: "Like ajouté" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

//Récupération de tous les commentaires d'un membres
exports.getAllLike = (req, res, next) => {
  //Jointure de Comments et Users
  Likes.belongsTo(Posts);
  Posts.hasMany(Likes);
  //Data qui seront retournées
  const options = {
    limit: 10,
    order: [["id", "DESC"]],
    include: {
      model: Posts,
      attributes: ["id", "userId"],
    },
  };

  Likes.findAll(options)
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch(() => {
      res.status(404).json({ error: "Impossible de retrouver les likes" });
    });
};

exports.getOneLike = (req, res, next) => {
  //Jointure de Comments et Users
  Likes.belongsTo(Posts);
  Posts.hasMany(Likes);
  //Data qui seront retournées
  const options = {
    where: { id: req.params.likeId },
    include: {
      model: Posts,
    },
  };
  Likes.findOne(options)
    .then((like) => {
      res.status(200).json(like);
    })
    .catch(() => {
      res.status(404).json({ error: "Like non trouvé" });
    });
};
