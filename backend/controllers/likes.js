const likeModel = require('../models/like');

async function toggleLike(req, res) {
  const { PostID, UserID } = req.body;

  if (!UserID) {
    return res.status(400).json({ error: 'Usuário não autenticado.' });
  }

  if (!PostID) {
    return res.status(400).json({ error: 'PostID é obrigatório.' });
  }

  try {
    const result = await likeModel.toggleLike(PostID, UserID);

    return res.status(200).json({ ...result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao alterar o status da curtida.' });
  }
}

module.exports = { toggleLike };
