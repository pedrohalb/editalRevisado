const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexão MySQL
const itemRoutes = require('./routes/itemRoutes');
const itemSingleEditalRoutes = require('./routes/itemSingleEditalRoutes'); // Importa as rotas para `items2`
const materiasRoutes = require('./routes/materiasRoutes');
const ItemListSingleSelectTopicRoutes = require('./routes/ItemListSingleSelectTopicRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Testa conexão com o MySQL
db.execute('SELECT 1')
  .then(() => console.log('Conexão com o MySQL bem-sucedida!'))
  .catch((err) => {
    console.error('Erro ao conectar ao MySQL:', err.message);
    process.exit(1); // Encerra o servidor em caso de erro
  });

// Rotas
app.use('/api/items', itemRoutes);
app.use('/api/items2', itemSingleEditalRoutes); // Define rota para `items2`
app.use('/api/items3', materiasRoutes);
app.use('/api/items4', ItemListSingleSelectTopicRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
