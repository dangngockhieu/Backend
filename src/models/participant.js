'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      Participant.belongsToMany(models.Quiz, {
        through: 'ParticipantQuiz',
        foreignKey: 'participant_id',
        as: 'quizzes',
      });
      Participant.hasMany(models.QuizParticipiantAnswer, {
        foreignKey: { name: 'participant_id', allowNull: false },
        as: 'participantAnswers',
      });
    }
  }

  Participant.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: true,
      },
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      image: DataTypes.BLOB('long'),
      refresh_token: DataTypes.STRING,
      refresh_expired: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'Participant',
    }
  );

  Participant.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  Participant.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  Participant.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return Participant;
};