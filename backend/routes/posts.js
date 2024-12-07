// backend/routes/posts.js
const express = require('express');
const { createNewPost, getUserPosts, getAllPosts, getPostDetails } = require('../controllers/posts');

const router = express.Router();

router.post('/', createNewPost);

router.get('/:userID', getUserPosts);

router.get('/', getAllPosts);

router.get('/:PostID', getPostDetails);

module.exports = router;
