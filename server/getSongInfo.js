const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getSongInfo(id,lastfetchtime) {
    const [rows] = await pool.query(`
        SELECT users.id as user_id, users.username, songs.*
        FROM users JOIN user_song_authorship JOIN songs
        ON users.id = user_song_authorship.user_id AND user_song_authorship.song_id = songs.id
        WHERE songs.id = ?
    `, [id]);
    //Append song number
    await pool.query('UPDATE songs SET views = views+1 where songs.id = ?',[id]);
    
    return rows[0];
}

module.exports = getSongInfo;