'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ParticipantQuiz extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  ParticipantQuiz.init(
    {
      participant_id: { type: DataTypes.INTEGER, allowNull: false },
      quiz_id: { type: DataTypes.INTEGER, allowNull: false },
      is_finish: { type: DataTypes.BOOLEAN, defaultValue: false },
      time_start: DataTypes.DATE,
      time_end: DataTypes.DATE,
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'ParticipantQuiz',
    }
  );

  ParticipantQuiz.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  ParticipantQuiz.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  ParticipantQuiz.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return ParticipantQuiz;
};