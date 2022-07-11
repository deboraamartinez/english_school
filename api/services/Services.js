const database = require('../models');

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRegister(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getOneRegister(where = {}) {
    return database[this.modelName].findOne({ where: { ...where } });
  }

  async createRegister(data) {
    return database[this.modelName].create(data);
  }

  async updateRegister(data, id, transaction = {}) {
    return database[this.nomeDoModelo].update(data, { where: { id } }, transaction);
  }

  async updateRegisters(data, where, transaction = {}) {
    return database[this.modelName].update(data, { where: { ...where } }, transaction);
  }

  async deleteRegister(id) {
    return database[this.modelName].destroy({ where: { id } });
  }

  async restoreRegister(id) {
    return database[this.modelName].restore({ where: { id } });
  }

  async getDeletedRegister(id) {
    return database[this.modelName].findOne({ paranoid: false, where: { id: Number(id) } });
  }

  async findAndCountRegister(aggregators, where = {}) {
    return database[this.nomeDoModelo].findAndCountAll({ where: { ...where }, ...aggregators });
  }
}

module.exports = Services;
