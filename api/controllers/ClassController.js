const { Op } = require('sequelize');
const database = require('../models');

class ClassController {
  static async createClass(req, res) {
    const newClass = req.body;
    try {
      const createdClass = await database.Classes.create(newClass);
      return res.status(200).json(createdClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAllClasses(req, res) {
    const { start_date, final_date } = req.query;
    const where = {};
    start_date || final_date ? (where.start_date = {}) : null;
    start_date ? (where.start_date[Op.gte] = start_date) : null;
    final_date ? (where.start_date[Op.lte] = final_date) : null;

    try {
      const allClasses = await database.Classes.findAll({
        where,
      });
      return res.status(200).json(allClasses);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getOneClass(req, res) {
    const { id } = req.params;
    try {
      const oneClass = await database.Classes.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(oneClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateClass(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      await database.Classes.update(updatedData, { where: { id: Number(id) } });
      const updatedClass = await database.Classes.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteClass(req, res) {
    const { id } = req.params;
    try {
      await database.Classes.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Class successfully deleted' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassController;
