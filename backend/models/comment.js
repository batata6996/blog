const db = require('../db');

async function createComment(postID, userID, content) {
  const sql = 'INSERT INTO Comments (PostID, UserID, Content) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [postID, userID, content]);
  return result;
}

async function getCommentsByPost(postId) {
  const sql = `
    SELECT c.Content, c.CreatedAt, u.name AS userName 
    FROM Comments c
    JOIN Users u ON c.UserID = u.UserID
    WHERE c.PostID = ?
    ORDER BY c.CreatedAt DESC
  `;
  const [rows] = await db.execute(sql, [postId]);
  return rows;
}

module.exports = { createComment, getCommentsByPost };
