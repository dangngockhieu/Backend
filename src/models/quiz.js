'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.belongsToMany(models.Participant, {
        through: 'ParticipantQuiz',
        foreignKey: 'quiz_id',
        as: 'participants',
      });
      Quiz.hasMany(models.QuizQuestion, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizQuestions',
      });
      Quiz.hasMany(models.QuizParticipiantAnswer, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizAnswers',
      });
      Quiz.hasMany(models.History, {
        foreignKey: { name: 'quiz_id', allowNull: false },
        as: 'quizHistory',
      });
    }
  }

  Quiz.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.BLOB('long'),
      difficulty: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'Quiz',
    }
  );

  Quiz.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  Quiz.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  Quiz.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return Quiz;
};