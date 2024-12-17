const itemService = require('../services/itemService');

const getItems = async (req, res) => {
  const { page = 1, limit = 5, search = '', sort = '' } = req.query;
  try {
    const result = await itemService.getAllItems(page, limit, search, sort);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar itens', error: err.message });
  }
};

const addItem = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
  }

  try {
    const newItem = await itemService.addItem({ name, description });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar item', error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const wasDeleted = await itemService.deleteItem(id);
    if (wasDeleted) {
      res.json({ message: 'Item excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir item', error: err.message });
  }
};

module.exports = { getItems, addItem, deleteItem };
