'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      People.hasMany(models.Classes, { foreignKey: 'teacherId' })
      People.hasMany(models.Enrollments, { foreignKey: 'studentId', scope: { status: 'Confirmed' }, as: 'confirmedEnrollments' })
    }
  }
  People.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        functionValidateName: function (data) {
          if (data.length < 3) throw new Error('The name must be completed')
        }

      }
    },
    status: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Must be an email"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
    paranoid: true,
    defaultScope: { where: { status: true } },
    scopes: {
      all: { where: {} }
    }
  },
  );
  return People;
};