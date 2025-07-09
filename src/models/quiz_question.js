'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    static associate(models) {
      QuizQuestion.hasMany(models.QuizAnswer, {
        foreignKey: { name: 'question_id', allowNull: false },
        as: 'answers',
      });
      QuizQuestion.belongsTo(models.Quiz, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizQuestions',
      });
      QuizQuestion.hasMany(models.QuizParticipiantAnswer, {
        foreignKey: { name: 'question_id', allowNull: false },
        as: 'participantAnswers',
      });
    }
  }

  QuizQuestion.init(
    {
      description: DataTypes.STRING,
      image: DataTypes.BLOB('long'),
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'QuizQuestion',
    }
  );

  QuizQuestion.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  QuizQuestion.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  QuizQuestion.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return QuizQuestion;
};