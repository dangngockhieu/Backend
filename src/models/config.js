'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  Config.init(
    {
      code_type: {
        type: DataTypes.STRING,
      },
      code_value: {
        type: DataTypes.STRING,
      },
      code_infor: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      paranoid: true,
      modelName: 'Config',
    }
  );

  Config.beforeCreate((instance) => {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    instance.dataValues.createdAt = now;
    instance.dataValues.updatedAt = now;
  });

  Config.beforeUpdate((instance) => {
    instance.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  Config.beforeDestroy((instance) => {
    instance.dataValues.deletedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  });

  return Config;
};