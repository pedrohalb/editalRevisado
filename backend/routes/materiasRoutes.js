const express = require('express');
const router = express.Router();
const MateriaController = require('../controllers/MateriaController');

router.get('/', MateriaController.getMaterias);
router.post('/', MateriaController.addMateria);
router.delete('/:id', MateriaController.deleteMateria);

module.exports = router;
