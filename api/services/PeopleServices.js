const Services = require('./Services');
const database = require('../models');

class PeopleServices extends Services {
  constructor() {
    super('People');
    this.enrollments = new Services('Enrollments');
  }

  async getActiveRegister(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getAllRegister(where = {}) {
    return database[this.modelName].scopo('all').findAll({ where: { ...where } });
  }

  async cancelPersonAndEnrollment(studentId) {
    return database.sequelize.transaction(async (t) => {
      await super.updateRegister({ status: false }, studentId, { transaction: t });
      await this.enrollments.updateRegisters(
        { status: 'Cancelled' },
        { studentId },
        { transaction: t },
      );
    });
  }

  async getEnrrollmentByStudent(where = {}) {
    const enrollments = await database[this.modelName].findOne({ where: { ...where } });
    return enrollments.getClassesEnrollments();
  }
}

module.exports = PeopleServices;
