const express = require('express');
const likesController = require('../controllers/likes');
const router = express.Router();

router.post('/', likesController.toggleLike);

module.exports = router;
