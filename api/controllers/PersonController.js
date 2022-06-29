const database = require('../models')

class PersonController {


  static async createPerson(req, res) {
    const newPerson = req.body
    try {
      const createdPerson = await database.People.create(newPerson)
      return res
        .status(200)
        .json(createdPerson)
    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async getAllActivePeople(req, res) {
    try {
      const allActivePeople = await database.People.findAll()
      return res
        .status(200)
        .json(allActivePeople)
    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async getAllPeople(req, res) {
    try {
      const allPeople = await database.People.scope('all').findAll()
      return res
        .status(200)
        .json(allPeople)
    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async getOnePerson(req, res) {
    const { id } = req.params
    try {
      const onePerson = await database.People.findOne({ where: { id: Number(id) } })
      return res
        .status(200)
        .json(onePerson)
    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params
    const updatedData = req.body
    try {
      await database.People.update(updatedData, { where: { id: Number(id) } })
      const updatedPerson = await database.People.findOne({ where: { id: Number(id) } })
      return res
        .status(200)
        .json(updatedPerson)

    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async deletePerson(req, res) {
    const { id } = req.params
    try {
      await database.People.destroy({ where: { id: Number(id) } })
      return res
        .status(200)
        .json({ message: `Person successfully deleted` })

    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async restorePerson(req, res) {
    const { id } = req.params
    try {
      await database.People.restore({ where: { id: Number(id) } })
      return res
        .status(200)
        .json({ message: `Id ${id} successfully restored` })

    } catch (error) {
      return res
        .status(500)
        .json(error.message)

    }
  }

  static async getOneEnrollment(req, res) {
    const { studentId, enrollmentId } = req.params
    try {
      const oneEnrollment = await database.Enrollments.findOne({
        where: { id: Number(enrollmentId) }, studentId: Number(studentId)
      })
      return res
        .status(200)
        .json(oneEnrollment)

    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async createEnrollment(req, res) {
    const { studentId } = req.params
    const newEnrollment = { ...req.body, studentId: Number(studentId) }
    try {
      const createdEnrollment = await database.Enrollments.create(newEnrollment)
      return res
        .status(200)
        .json(createdEnrollment)

    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async updateEnrollment(req, res) {
    const { studentId, enrollmentId } = req.params
    const newInfos = req.body
    try {
      await database.Enrollments.update(newInfos, { where: { id: Number(enrollmentId) }, studentId: Number(studentId) })
      const updatedEnrollment = await database.Enrollments.findOne({ where: { id: Number(enrollmentId) } })
      return res
        .status(200)
        .json(updatedEnrollment)

    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }


  static async deleteEnrollment(req, res) {
    const { studentId, enrollmentId } = req.params
    try {
      await database.Enrollments.destroy({ where: { id: Number(enrollmentId) } })
      return res
        .status(200)
        .json({ message: `Person successfully deleted` })
    } catch (error) {
      return res
        .status(500)
        .json(error.message)
    }
  }

  static async getPersonEnrollments(req, res) {
    const { studentId } = req.params
    try {
      const person = await database.People.findOne({ where: { id: Number(studentId) } })
      const enrollments = await person.getConfirmedEnrollments()
      return res
        .status(200)
        .json(enrollments)

    } catch (error) {
      return res
        .status(500)
        .json(error.message)

    }
  }

}

module.exports = PersonController