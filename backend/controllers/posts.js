// backend/controllers/posts.js
const { createPost, getPostsByUser, fetchAllPosts } = require('../models/posts');

// Cria um novo post
const createNewPost = async (req, res) => {
    const { userID, title, content } = req.body;

    if (!userID || !title || !content) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const post = await createPost(userID, title, content);
        res.status(201).json({ message: 'Post criado com sucesso!', postID: post.insertId });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro interno ao criar o post.' });
    }
};

const getUserPosts = async (req, res) => {
    const { userID } = req.params;

    try {
        const posts = await getPostsByUser(userID);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro interno ao buscar os posts.' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await fetchAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar todos os posts:', error);
        res.status(500).json({ error: 'Erro interno ao buscar os posts.' });
    }
};

module.exports = { createNewPost, getUserPosts, getAllPosts };

