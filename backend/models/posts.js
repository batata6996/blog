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

const fetchAllPosts = async () => {
    const query = 'SELECT Posts.PostID, Posts.Title, Posts.Content, Posts.CreatedAt, Users.Name AS Author FROM Posts JOIN Users ON Posts.UserID = Users.UserID ORDER BY Posts.CreatedAt DESC';
    const [rows] = await db.execute(query);
    return rows;
};

const getPostByID = async (postID) => {
    const query = `
        SELECT 
            Posts.PostID, 
            Posts.Title, 
            Posts.Content, 
            Posts.CreatedAt, 
            Users.Name AS Author 
        FROM Posts 
        JOIN Users ON Posts.UserID = Users.UserID 
        WHERE Posts.PostID = ?
    `;
    const [rows] = await db.execute(query, [postID]);
    return rows[0]; // Retorna apenas o primeiro resultado, pois o ID é único
};


module.exports = { createPost, getPostsByUser, fetchAllPosts, getPostByID };
