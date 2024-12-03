// backend/routes/posts.js
const express = require('express');
const { createNewPost, getUserPosts } = require('../controllers/posts');

const router = express.Router();

// Rota para criar um post
router.post('/', createNewPost);

// Rota para buscar posts de um usuário (opcional)
router.get('/:userID', getUserPosts);

module.exports = router;
