const ItemSingleMateriaModel = require('../models/ItemSingleMateriaModel');

// Função para obter todos os tópicos com paginação, busca e ordenação
const getAllTopics = async (page, limit, search, sort) => {
  return await ItemSingleMateriaModel.getAllTopics(page, limit, search, sort);
};

// Função para adicionar um novo tópico
const addTopic = async ({ nomeTopico, numeroArquivos }) => {
  return await ItemSingleMateriaModel.addTopic({ nomeTopico, numeroArquivos });
};

// Função para deletar um tópico por ID
const deleteTopic = async (id) => {
  return await ItemSingleMateriaModel.deleteTopic(id);
};

// Exporta as funções como um objeto
module.exports = { getAllTopics, addTopic, deleteTopic };
