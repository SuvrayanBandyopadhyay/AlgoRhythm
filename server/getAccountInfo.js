const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getAccountInfo(id,lastfetchtime) {
    const [rows] = await pool.query(`
         select users.id,users.username,users.email,users.create_timestamp, count(*) as number from users,user_song_authorship,songs where users.id = user_song_authorship.user_id and user_song_authorship.song_id = songs.id and users.id = ? group by users.id;
    `, [id]);

    return rows[0];
}

module.exports = getAccountInfo;