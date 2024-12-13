const itemService = require('../services/itemService');

// Lista todos os itens
const getItems = (req, res) => {
  const { page = 1, limit = 5, search = '', sort = '' } = req.query;

  const result = itemService.getAllItems(page, limit, search, sort);
  res.json(result);
};


// Exclui um item
const deleteItem = (req, res) => {
  const { id } = req.params;

  const wasDeleted = itemService.deleteItem(id);
  if (wasDeleted) {
    res.json({ message: 'Item excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Item não encontrado' });
  }
};

// Adiciona um novo item
const addItem = (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
  }

  const newItem = itemService.addItem({ name, description });
  res.json(newItem);
};

module.exports = { getItems, addItem, deleteItem };
