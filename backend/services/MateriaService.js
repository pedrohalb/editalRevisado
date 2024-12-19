const MateriaModel = require('../models/MateriaModel');

const getAllMaterias = async (page, limit, search, sort) => {
  return await MateriaModel.getAllMaterias(page, limit, search, sort);
};

const addMateria = async ({ nomeMateria, numeroTopicos }) => {
  if (!nomeMateria || numeroTopicos === undefined) {
    throw new Error('Todos os campos são obrigatórios');
  }
  return await MateriaModel.addMateria({ nomeMateria, numeroTopicos });
};

const deleteMateria = async (id) => {
  return await MateriaModel.deleteMateria(id);
};

module.exports = { getAllMaterias, addMateria, deleteMateria };
