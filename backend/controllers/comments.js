const commentModel = require('../models/comment');

async function addComment(req, res) {
  const { postID, content } = req.body;
  const userID = req.userID; // Extraído do token JWT

  if (!content || !postID) {
    return res.status(400).json({ error: 'PostID e conteúdo são obrigatórios.' });
  }

  try {
    await commentModel.createComment(postID, userID, content);
    return res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar o comentário.' });
  }
}

async function getComments(req, res) {
  const { postID } = req.params;

  try {
    const comments = await commentModel.getCommentsByPost(postID);
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar comentários.' });
  }
}

module.exports = { addComment, getComments };
