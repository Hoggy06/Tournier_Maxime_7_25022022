module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idAuthor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: "created",
      updatedAt: "updated",
    }
  );
  return Comments;
};
