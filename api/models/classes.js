'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Classes.hasMany(models.Enrollments, { foreignKey: 'classId' })
      Classes.belongsTo(models.People, { foreignKey: 'teacherId' })
      Classes.belongsTo(models.Levels, { foreignKey: 'levelId' })
    }
  }
  Classes.init({
    start_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Classes',
  }, {
    paranoid: true
  });
  return Classes;
};