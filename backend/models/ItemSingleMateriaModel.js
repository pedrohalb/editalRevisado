const db = require('../config/db');

const ItemSingleMateriaModel = {
  getAllTopics: async (page = 1, limit = 5, search = '', sort = '') => {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM items4 WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND nomeTopico LIKE ?';
      params.push(`%${search}%`);
    }

    if (sort === 'asc') query += ' ORDER BY nomeTopico ASC';
    if (sort === 'desc') query += ' ORDER BY nomeTopico DESC';

    query += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`; // Valores inteiros diretos

    const [topics] = await db.execute(query, params);
    const [[{ count }]] = await db.execute('SELECT COUNT(*) AS count FROM items4');

    return {
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      topics,
    };
  },

  addTopic: async ({ nomeTopico, numeroArquivos }) => {
    const [result] = await db.execute(
      'INSERT INTO items4 (nomeTopico, numeroArquivos) VALUES (?, ?)',
      [nomeTopico, numeroArquivos]
    );
    return { id: result.insertId, nomeTopico, numeroArquivos };
  },

  deleteTopic: async (id) => {
    const [result] = await db.execute('DELETE FROM items4 WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ItemSingleMateriaModel;
