const ItemDefaultMateriaModel = require('../models/ItemDefaultMateriaModel');

const getAllMaterias = async (page, limit, search, sort) => {
  return await ItemDefaultMateriaModel.getAllMaterias(page, limit, search, sort);
};

const addMateria = async ({ nomeMateria, numeroTopicos }) => {
  if (!nomeMateria || numeroTopicos === undefined) {
    throw new Error('Todos os campos são obrigatórios');
  }
  return await ItemDefaultMateriaModel.addMateria({ nomeMateria, numeroTopicos });
};

const deleteMateria = async (id) => {
  return await ItemDefaultMateriaModel.deleteMateria(id);
};

module.exports = { getAllMaterias, addMateria, deleteMateria };
