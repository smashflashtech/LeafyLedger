'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plantsUsers extends Model {
    static associate(models) {
    }
  };
  plantsUsers.init({
    plantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plantsUsers',
  });
  return plantsUsers;
};