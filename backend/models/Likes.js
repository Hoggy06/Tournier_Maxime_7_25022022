module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isLike: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      createdAt: "created",
    }
  );
  return Likes;
};
