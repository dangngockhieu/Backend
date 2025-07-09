'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.Quiz, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizHistory',
      });
    }
  }

  History.init(
    {
      participant_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      total_questions: DataTypes.INTEGER,
      total_correct: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'History',
    }
  );

  History.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  History.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  History.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return History;
};