"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      songName: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      singer: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      category1: {
        type: Sequelize.STRING,
      },
      category2: {
        type: Sequelize.STRING,
      },
      category3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
