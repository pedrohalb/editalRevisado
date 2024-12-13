const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON
const dataPath = path.join(__dirname, '../data.json');

// Função auxiliar para ler o arquivo JSON
const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// Função auxiliar para escrever no arquivo JSON
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

const getAllItems = (page = 1, limit = 5, search = '', sort = '') => {
  let items = readData();

  // Filtra itens pelo termo de busca (case insensitive)
  if (search) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Ordena os itens
  if (sort === 'asc') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'desc') {
    items.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Calcula os índices para os itens da página
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    totalItems: items.length,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(items.length / limit),
    items: paginatedItems,
  };
};

// Exclui um item
const deleteItem = (id) => {
  const items = readData();

  const filteredItems = items.filter((item) => item.id !== parseInt(id, 10));
  const wasDeleted = items.length !== filteredItems.length;

  if (wasDeleted) {
    writeData(filteredItems);
  }

  return wasDeleted;
};

// Adiciona um novo item
const addItem = ({ name, description }) => {
  const items = readData();

  // Calcula o próximo ID baseado no maior ID existente
  const nextId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

  const newItem = { id: nextId, name, description };
  items.push(newItem);
  writeData(items);

  return newItem;
};

module.exports = { getAllItems, deleteItem, addItem };
