// backend/routes/posts.js
const express = require('express');
const { createNewPost, getUserPosts, getAllPosts } = require('../controllers/posts');

const router = express.Router();

router.post('/', createNewPost);

router.get('/:userID', getUserPosts);

router.get('/', getAllPosts);

module.exports = router;
