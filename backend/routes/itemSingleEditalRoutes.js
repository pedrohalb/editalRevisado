const express = require('express');
const { getItems2, addItem2, deleteItem2 } = require('../controllers/itemSingleEditalController');
const router = express.Router();

router.get('/', getItems2);
router.post('/', addItem2);
router.delete('/:id', deleteItem2);

module.exports = router;
