const { PeopleServices } = require('../services/index');

const peopleServices = new PeopleServices();

class PersonController {
  static async createPerson(req, res) {
    const newPerson = req.body;
    try {
      const createdPerson = await PeopleServices.create(newPerson);
      return res.status(200).json(createdPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAllActivePeople(req, res) {
    try {
      const allActivePeople = await peopleServices.getActiveRegister();
      return res.status(200).json(allActivePeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAllPeople(req, res) {
    try {
      const allPeople = await peopleServices.getAllRegister();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getOnePerson(req, res) {
    const { id } = req.params;
    try {
      const onePerson = await peopleServices.getOneRegister({ id });
      return res.status(200).json(onePerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      await peopleServices.updateRegister(updatedData, { id });
      const updatedPerson = await peopleServices.getOneRegister({ id });
      return res.status(200).json(updatedPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletePerson(req, res) {
    const { id } = req.params;
    try {
      await peopleServices.deleteRegister({ id });
      return res.status(200).json({ message: 'Person successfully deleted' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restorePerson(req, res) {
    const { id } = req.params;
    try {
      await peopleServices.restoreRegister({ id });
      return res.status(200).json({ message: `Id ${id} successfully restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getPersonEnrollments(req, res) {
    const { studentId } = req.params;
    try {
      const enrollments = await peopleServices.getEnrrollmentByStudent({ id: Number(studentId) });
      return res.status(200).json(enrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancelPerson(req, res) {
    const { studentId } = req.params;
    try {
      await peopleServices.cancelPersonAndEnrollment(Number(studentId));
      return res.status(200).json({ message: `enrollments ref. student ${studentId} cancelled` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PersonController;
