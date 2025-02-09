const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function searchSongs(query, offset) {
    const limit = 20;

    const [rows] = await pool.query(`
        SELECT users.username, songs.*
        FROM users JOIN user_song_authorship JOIN songs
        ON users.id = user_song_authorship.user_id AND user_song_authorship.song_id = songs.id
        WHERE songs.title REGEXP ?
        LIMIT ${limit}
        OFFSET ?
    `, [query, offset * limit]);

    return rows;
}

module.exports = searchSongs;