const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerUser, loginUser } = require('./controllers/users');
const postRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const likesRoutes = require('./routes/likes');
require('dotenv').config();

const app = express(); 

app.use(bodyParser.json());
app.use(cors());

const db = require('./db'); 
db.getConnection()
    .then((connection) => {
        console.log('Conexão com o banco de dados estabelecida.');
        connection.release(); 
    })
    .catch((err) => {
        console.error('Erro ao conectar no banco de dados:', err.message);
        process.exit(1); 
    });

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes); 
app.post('/api/users/register', registerUser); 
app.post('/api/users/login', loginUser);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});
