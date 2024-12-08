const express = require('express');
const commentsController = require('../controllers/comments');
const router = express.Router();

router.get('/:postID', commentsController.getComments);
router.post('/', commentsController.addComment);

module.exports = router;
