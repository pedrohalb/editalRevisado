const db = require('../config/db');

// Serviço para tabela `items2`
const itemSingleEditalModel = {
  getAllItems: async (page = 1, limit = 5, search = '', sort = '') => {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    let query = 'SELECT * FROM items2 WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (nomeMateria LIKE ?)';
      params.push(`%${search}%`);
    }

    if (sort === 'asc') query += ' ORDER BY nomeMateria ASC';
    if (sort === 'desc') query += ' ORDER BY nomeMateria DESC';

    query += ` LIMIT ${limitInt} OFFSET ${offset}`;

    const [items] = await db.execute(query, params);

    const [[{ count }]] = await db.execute('SELECT COUNT(*) AS count FROM items2');

    return {
      totalItems: count,
      currentPage: pageInt,
      totalPages: Math.ceil(count / limitInt),
      items,
    };
  },

  addItem: async ({ nomeMateria, topicosDisponiveis, topicosAtivos }) => {
    const [result] = await db.execute(
      'INSERT INTO items2 (nomeMateria, topicosDisponiveis, topicosAtivos) VALUES (?, ?, ?)',
      [nomeMateria, topicosDisponiveis, topicosAtivos]
    );
    return { id: result.insertId, nomeMateria, topicosDisponiveis, topicosAtivos };
  },

  deleteItem: async (id) => {
    const [result] = await db.execute('DELETE FROM items2 WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = itemSingleEditalModel;
