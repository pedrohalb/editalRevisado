const ItemListSingleSelectTopicModel = require('../models/ItemListSingleSelectTopicModel');

// Função para obter todos os tópicos com paginação, busca e ordenação
const getAllTopics = async (page, limit, search, sort) => {
  return await ItemListSingleSelectTopicModel.getAllTopics(page, limit, search, sort);
};

// Função para adicionar um novo tópico
const addTopic = async ({ nomeTopico, numeroArquivos }) => {
  return await ItemListSingleSelectTopicModel.addTopic({ nomeTopico, numeroArquivos });
};

// Função para deletar um tópico por ID
const deleteTopic = async (id) => {
  return await ItemListSingleSelectTopicModel.deleteTopic(id);
};

// Exporta as funções como um objeto
module.exports = { getAllTopics, addTopic, deleteTopic };
