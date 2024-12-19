const itemSingleEditalService = require('../services/itemSingleEditalService');

const getItems2 = async (req, res) => {
  const { page = 1, limit = 5, search = '', sort = '' } = req.query;
  try {
    const result = await itemSingleEditalService.getAllItems(page, limit, search, sort);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar itens', error: err.message });
  }
};

const addItem2 = async (req, res) => {
  const { nomeMateria, topicosDisponiveis, topicosAtivos } = req.body;

  if (!nomeMateria || topicosDisponiveis === undefined || topicosAtivos === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const newItem = await itemSingleEditalService.addItem({ nomeMateria, topicosDisponiveis, topicosAtivos });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar item', error: err.message });
  }
};

const deleteItem2 = async (req, res) => {
  const { id } = req.params;

  try {
    const wasDeleted = await itemSingleEditalService.deleteItem(id);
    if (wasDeleted) {
      res.json({ message: 'Item excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir item', error: err.message });
  }
};

module.exports = { getItems2, addItem2, deleteItem2 };
