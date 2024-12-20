const express = require('express');
const { getTopics, addTopic, deleteTopic } = require('../controllers/ItemListSingleSelectTopicController');

const router = express.Router();

router.get('/', getTopics); // Rota para listar tópicos
router.post('/', addTopic); // Rota para adicionar um novo tópico
router.delete('/:id', deleteTopic); // Rota para deletar um tópico

module.exports = router;
