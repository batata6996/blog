const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt received:', { email });

    try {
        const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        console.log('Database query executed. Rows returned:', rows.length);

        if (rows.length === 0) {
            console.log('No user found with the provided email.');
            return res.status(404).json({ success: false, message: 'Usuário não encontrado!' });
        }

        const user = rows[0];
        console.log('User retrieved:', user);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password validation result:', validPassword);

        if (!validPassword) {
            console.log('Invalid password provided.');
            return res.status(401).json({ success: false, message: 'Senha incorreta!' });
        }

        const token = jwt.sign(
            { id: user.UserID, email: user.email, isAdmin: user.admin === 1 },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('JWT generated:', token);

        res.status(200).json({ success: true, message: 'Login bem-sucedido!', token });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});


module.exports = router;
