'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuizParticipiantAnswer extends Model {
    static associate(models) {
      QuizParticipiantAnswer.belongsTo(models.Participant, {
        foreignKey: { name: 'participant_id', allowNull: false },
        as: 'participantAnswers',
      });
      QuizParticipiantAnswer.belongsTo(models.QuizQuestion, {
        foreignKey: { name: 'question_id', allowNull: false },
        as: 'questions',
      });
      QuizParticipiantAnswer.belongsTo(models.Quiz, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizAnswers',
      });
    }
  }

  QuizParticipiantAnswer.init(
    {
      participant_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      question_id: { type: DataTypes.INTEGER, allowNull: false },
      user_answers: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'QuizParticipiantAnswer',
    }
  );

  QuizParticipiantAnswer.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  QuizParticipiantAnswer.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  QuizParticipiantAnswer.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return QuizParticipiantAnswer;
};