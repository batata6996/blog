const bcrypt = require('bcrypt');
const db = require('../db'); // Importa o pool prometido
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Usuário já existe!' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o novo usuário
        const [result] = await db.execute(
            'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // Gera um token JWT para o novo usuário
        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Usuário cadastrado com sucesso:', { name, email });
        return res.status(201).json({ success: true, message: 'Usuário registrado com sucesso', token });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe no banco
        const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (rows.length === 0) {
            console.log('Tentativa de login com email não encontrado:', email);
            return res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }

        const user = rows[0];

        // Verifica se a senha está correta
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Senha incorreta para o usuário:', email);
            return res.status(401).json({ success: false, message: 'Senha incorreta!' });
        }

        // Gerar token JWT incluindo o identificador de administrador
        const token = jwt.sign(
            { id: user.UserID, email: user.email, isAdmin: user.admin === 1 },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Login bem-sucedido para o usuário:', email);
        return res.status(200).json({ 
            success: true, 
            message: 'Login realizado com sucesso!', 
            token, 
            isAdmin: user.admin === 1 
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

module.exports = { registerUser, loginUser };
