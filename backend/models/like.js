const db = require('../db');

async function toggleLike(PostID, UserID) {
  if (!PostID || !UserID) {
    throw new Error('PostID e userID são obrigatórios.');
  }

  const checkSql = 'SELECT * FROM Likes WHERE PostID = ? AND UserID = ?';
  const [likes] = await db.execute(checkSql, [PostID, UserID]);

  let liked; 
  
  if (likes.length > 0) {
    const deleteSql = 'DELETE FROM Likes WHERE PostID = ? AND UserID = ?';
    await db.execute(deleteSql, [PostID, UserID]);

    const decrementLikeSql = 'UPDATE Posts SET likeCount = likeCount - 1 WHERE PostID = ?';
    await db.execute(decrementLikeSql, [PostID]);

    liked = false; 
  } else {
    const insertSql = 'INSERT INTO Likes (PostID, UserID) VALUES (?, ?)';
    await db.execute(insertSql, [PostID, UserID]);

    const incrementLikeSql = 'UPDATE Posts SET likeCount = likeCount + 1 WHERE PostID = ?';
    await db.execute(incrementLikeSql, [PostID]);

    liked = true; 
  }

  const [updatedLikeCount] = await db.execute('SELECT likeCount FROM Posts WHERE PostID = ?', [PostID]);

  return { liked, likeCount: updatedLikeCount[0].likeCount }; 
}


module.exports = { toggleLike };
