"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      songName: DataTypes.STRING,
      userId: DataTypes.STRING,
      desc: DataTypes.STRING,
      singer: DataTypes.STRING,
      url: DataTypes.STRING,
      date: DataTypes.DATE,
      category1: DataTypes.STRING,
      category2: DataTypes.STRING,
      category3: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
