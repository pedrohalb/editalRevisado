const express = require('express');
const router = express.Router();
const ItemDefaultMateriaController = require('../controllers/ItemDefaultMateriaController');

router.get('/', ItemDefaultMateriaController.getMaterias);
router.post('/', ItemDefaultMateriaController.addMateria);
router.delete('/:id', ItemDefaultMateriaController.deleteMateria);

module.exports = router;
