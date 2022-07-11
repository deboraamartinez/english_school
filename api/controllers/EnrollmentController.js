const Sequelize = require('sequelize');
const { EnrollmentsServices } = require('../services');

const enrollmentsServices = new EnrollmentsServices();

class EnrollmentController {
  static async getOneEnrollment(req, res) {
    const { studentId, enrollmentId } = req.params;
    try {
      const oneEnrollment = await enrollmentsServices.getOneRegister({
        id: enrollmentId,
        studentId,
      });
      return res.status(200).json(oneEnrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createEnrollment(req, res) {
    const { studentId } = req.params;
    const newEnrollment = { ...req.body, studentId: Number(studentId) };
    try {
      const newEnrollmentCreated = await enrollmentsServices.createRegister(newEnrollment);
      return res.status(200).json(newEnrollmentCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateEnrollment(req, res) {
    const { studentId, enrollmentId } = req.params;
    const newInfo = req.body;
    try {
      await enrollmentsServices.updateRegister(newInfo, {
        id: Number(enrollmentId),
        studentId: Number(studentId),
      });
      return res.status(200).json({ message: `id ${enrollmentId} updated` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteEnrollment(req, res) {
    const { enrollmentId } = req.params;
    try {
      await enrollmentsServices.deleteRegister(Number(enrollmentId));
      return res.status(200).json({ message: `id ${enrollmentId} deleted` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreEnrollment(req, res) {
    const { enrollmentId } = req.params;
    try {
      await enrollmentsServices.restoreRegister(Number(enrollmentId));
      return res.status(200).json({ mensagem: `id ${enrollmentId} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getEnrollmentsByClass(req, res) {
    const { classId } = req.params;
    try {
      const allEnrollments = await enrollmentsServices.findAndCountRegister(
        { classId: Number(classId), status: 'Confirmed' },
        { limit: 20, order: [['studentId', 'DESC']] },
      );
      return res.status(200).json(allEnrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getFullClasses(req, res) {
    const fullyClass = 2;
    try {
      const fullClasses = await enrollmentsServices.findAndCountRegister(
        { status: 'Confirmed' },
        {
          attributes: ['classId'],
          group: ['classId'],
          having: Sequelize.literal(`count(classId) >= ${fullyClass}`),
        },
      );
      return res.status(200).json(fullClasses.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentController;
