'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plant extends Model {
    static associate(models) {
      // define association here
      models.plant.belongsToMany(models.user, {through: "plantsUsers"})
    }
  };
  plant.init({
    common_name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    apiId: DataTypes.STRING,
    lastWatered: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plant',
  });
  return plant;
};