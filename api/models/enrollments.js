const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enrollments.belongsTo(models.People, { foreignKey: 'studentId' });
      Enrollments.belongsTo(models.Classes, { foreignKey: 'classId' });
    }
  }
  Enrollments.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Enrollments',
    },
    {
      paranoid: true,
    },
  );
  return Enrollments;
};
