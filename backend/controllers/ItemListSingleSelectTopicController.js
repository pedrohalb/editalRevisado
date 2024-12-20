const ItemListSingleSelectTopicService = require('../services/ItemListSingleSelectTopicService');

const getTopics = async (req, res) => {
  const { page = 1, limit = 5, search = '', sort = '' } = req.query;

  // Validação de entrada
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const validSort = sort === 'asc' || sort === 'desc' ? sort : '';

  if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
    return res.status(400).json({ message: 'Parâmetros de paginação inválidos' });
  }

  try {
    const result = await ItemListSingleSelectTopicService.getAllTopics(
      pageNumber,
      limitNumber,
      search,
      validSort
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tópicos', error: err.message });
  }
};


const addTopic = async (req, res) => {
  const { nomeTopico, numeroArquivos } = req.body;

  if (!nomeTopico || numeroArquivos === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const newTopic = await ItemListSingleSelectTopicService.addTopic({ nomeTopico, numeroArquivos });
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar tópico', error: err.message });
  }
};

const deleteTopic = async (req, res) => {
  const { id } = req.params;

  try {
    const wasDeleted = await ItemListSingleSelectTopicService.deleteTopic(id);
    if (wasDeleted) {
      res.json({ message: 'Tópico excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Tópico não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir tópico', error: err.message });
  }
};

module.exports = { getTopics, addTopic, deleteTopic };
