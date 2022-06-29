'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Levels.hasMany(models.Classes, { foreignKey: 'levelId' })
    }
  }
  Levels.init({
    describe_level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Levels',
  }, {
    paranoid: true
  });
  return Levels;
};