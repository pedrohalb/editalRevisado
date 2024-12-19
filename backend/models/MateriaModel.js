const db = require('../config/db');

const MateriaModel = {
  getAllMaterias: async (page = 1, limit = 5, search = '', sort = '') => {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    let query = 'SELECT * FROM items3 WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND nomeMateria LIKE ?';
      params.push(`%${search}%`);
    }

    if (sort === 'asc') query += ' ORDER BY nomeMateria ASC';
    if (sort === 'desc') query += ' ORDER BY nomeMateria DESC';

    query += ` LIMIT ${limitInt} OFFSET ${offset}`;

    const [items] = await db.execute(query, params);

    const [[{ count }]] = await db.execute('SELECT COUNT(*) AS count FROM items3');

    return {
      totalItems: count,
      currentPage: pageInt,
      totalPages: Math.ceil(count / limitInt),
      items,
    };
  },

  addMateria: async ({ nomeMateria, numeroTopicos }) => {
    const [result] = await db.execute(
      'INSERT INTO items3 (nomeMateria, numeroTopicos) VALUES (?, ?)',
      [nomeMateria, numeroTopicos]
    );
    return { id: result.insertId, nomeMateria, numeroTopicos };
  },

  deleteMateria: async (id) => {
    const [result] = await db.execute('DELETE FROM items3 WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = MateriaModel;
