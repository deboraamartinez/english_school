const Services = require('../services/Services');

const levelsServices = new Services('Levels');

class LevelController {
  static async createLevel(req, res) {
    const newLevel = req.body;
    try {
      const createdLevel = await levelsServices.createRegister(newLevel);
      return res.status(200).json(createdLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAllLevels(req, res) {
    try {
      const allLevels = await levelsServices.getAllRegister();
      return res.status(200).json(allLevels);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getOneLevel(req, res) {
    const { id } = req.params;
    try {
      const oneLevel = await levelsServices.getOneRegister(Number(id));
      return res.status(200).json(oneLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateLevel(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      await levelsServices.updateRegister(updatedData, Number(id));
      const updatedLevel = await levelsServices.getOneRegister(Number(id));
      return res.status(200).json(updatedLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteLevel(req, res) {
    const { id } = req.params;
    try {
      await levelsServices.deleteRegister(Number(id));
      return res.status(200).json({ message: 'Level successfully deleted' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreLevel(req, res) {
    const { id } = req.params;
    try {
      await levelsServices.restoreRegister(id);
      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelController;
