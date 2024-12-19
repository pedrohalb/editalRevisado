const MateriaService = require('../services/MateriaService');

const getMaterias = async (req, res) => {
  const { page = 1, limit = 5, search = '', sort = '' } = req.query;
  try {
    const result = await MateriaService.getAllMaterias(page, limit, search, sort);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar matérias', error: err.message });
  }
};

const addMateria = async (req, res) => {
  const { nomeMateria, numeroTopicos } = req.body;

  if (!nomeMateria || numeroTopicos === undefined) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const newMateria = await MateriaService.addMateria({ nomeMateria, numeroTopicos });
    res.status(201).json(newMateria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar matéria', error: err.message });
  }
};

const deleteMateria = async (req, res) => {
  const { id } = req.params;

  try {
    const wasDeleted = await MateriaService.deleteMateria(id);
    if (wasDeleted) {
      res.json({ message: 'Matéria excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Matéria não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir matéria', error: err.message });
  }
};

module.exports = { getMaterias, addMateria, deleteMateria };
