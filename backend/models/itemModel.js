const db = require('../config/db');

// Modelo de Item
const ItemModel = {
  // Cria um novo item
  addItem: async ({ name, description }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const subitens = Math.floor(Math.random() * 11);
    const [result] = await db.execute(
      'INSERT INTO items (name, description, data, subitens) VALUES (?, ?, ?, ?)',
      [name, description, currentDate, subitens]
    );
    return { id: result.insertId, name, description, data: currentDate, subitens };
  },

  // Busca todos os itens com filtros e paginação
  getAllItems: async (page = 1, limit = 5, search = '', sort = '') => {
    // Garante que page e limit são números inteiros válidos
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;
  
    let query = 'SELECT * FROM items WHERE 1=1';
    const params = [];
  
    // Filtro de busca
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
  
    // Ordenação
    if (sort === 'asc') query += ' ORDER BY name ASC';
    if (sort === 'desc') query += ' ORDER BY name DESC';
  
    // Paginação - LIMIT e OFFSET como números
    query += ` LIMIT ${limitInt} OFFSET ${offset}`;
  
    try {
      // Executa a consulta
      /*console.log('Query SQL:', query); // Log para depuração
      console.log('Parâmetros:', params);*/
  
      const [items] = await db.execute(query, params);

      // Formata a data para YYYY-MM-DD
      const formattedItems = items.map((item) => ({
        ...item,
        data: new Date(item.data).toISOString().split('T')[0], // Formata a data
      }));
  
      // Consulta para contagem total
      const [[{ count }]] = await db.execute('SELECT COUNT(*) AS count FROM items');
  
      return {
        totalItems: count,
        currentPage: pageInt,
        totalPages: Math.ceil(count / limitInt),
        items: formattedItems,
      };
    } catch (err) {
      console.error('Erro ao buscar itens:', err.message);
      throw err;
    }
  },

  // Deleta um item
  deleteItem: async (id) => {
    const [result] = await db.execute('DELETE FROM items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ItemModel;
