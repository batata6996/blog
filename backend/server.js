const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerUser } = require('./controllers/users');
require('dotenv').config(); // Carrega as variáveis de ambiente

const app = express(); // Inicialização do Express

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Testar a conexão com o banco de dados
const db = require('./db'); // Importa o pool de conexões prometido
db.getConnection()
    .then((connection) => {
        console.log('Conexão com o banco de dados estabelecida.');
        connection.release(); // Libera a conexão
    })
    .catch((err) => {
        console.error('Erro ao conectar no banco de dados:', err.message);
        process.exit(1); // Finaliza o processo em caso de erro
    });

// Importar e usar as rotas
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes); // Rotas do usuário
app.post('/api/users/register', registerUser); // Endpoint de registro

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
