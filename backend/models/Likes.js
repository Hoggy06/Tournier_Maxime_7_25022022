module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
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
      updatedAt: false,
    }
  );
  return Likes;
};
