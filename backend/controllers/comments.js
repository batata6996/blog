const commentModel = require('../models/comment');

async function addComment(req, res) {
  const { PostID, content, userID } = req.body;


  if (!content || !PostID || !userID) {
    console.log('Dados recebidos:', req.body);
    return res.status(400).json({ error: 'PostID, UserID e conteúdo são obrigatórios.' });
  }

  try {
    const result = await commentModel.createComment(PostID, userID, content);

    return res.status(201).json({ 
      id: result.insertId, 
      PostID, 
      userID, 
      content, 
      createdAt: new Date() 
    });
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    return res.status(500).json({ error: 'Erro ao adicionar o comentário.' });
  }
}

async function getComments(req, res) {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'PostID é obrigatório.' });
  }

  try {
    const comments = await commentModel.getCommentsByPost(postId);
    return res.status(200).json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return res.status(500).json({ error: 'Erro ao buscar comentários.' });
  }
}

module.exports = { addComment, getComments };