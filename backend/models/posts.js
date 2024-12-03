const db = require('../db');

const createPost = async (userID, title, content) => {
    const query = 'INSERT INTO Posts (UserID, Title, Content) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [userID, title, content]);
    return result;
};

const getPostsByUser = async (userID) => {
    const query = 'SELECT * FROM Posts WHERE UserID = ? ORDER BY CreatedAt DESC';
    const [rows] = await db.execute(query, [userID]);
    return rows;
};

module.exports = { createPost, getPostsByUser };
