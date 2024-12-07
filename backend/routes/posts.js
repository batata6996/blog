// backend/routes/posts.js
const express = require('express');
const { createNewPost, getUserPosts } = require('../controllers/posts');

const router = express.Router();

router.post('/', createNewPost);

router.get('/:userID', getUserPosts);

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts(); 
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno ao buscar os posts.' });
    }
});

module.exports = router;
