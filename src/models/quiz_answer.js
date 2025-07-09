'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuizAnswer extends Model {
    static associate(models) {
      QuizAnswer.belongsTo(models.QuizQuestion, {
        foreignKey: { name: 'question_id', allowNull: false },
        as: 'answers',
      });
    }
  }

  QuizAnswer.init(
    {
      description: DataTypes.STRING,
      correct_answer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'QuizAnswer',
    }
  );

  QuizAnswer.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  QuizAnswer.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  QuizAnswer.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return QuizAnswer;
};