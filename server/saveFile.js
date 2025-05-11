const mysql = require('mysql2');
const dotenv = require('dotenv');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function saveFile(userID,title,imageFile,audioFile) {
  

    const [rows] = await pool.query("SELECT * from users where id = ?", [userID]);
   
    //If match found
    if(rows.length==1)
    {
        await pool.query("INSERT INTO songs (title,upload_timestamp,audioFile,imageFile) VALUES (?,now(),?,?)",[title,audioFile,imageFile])
        const [rows3] = await pool.query("SELECT id from songs where title = ?",[title]);
        songID = rows3[0].id;
        await pool.query("INSERT INTO user_song_authorship values (?,?)",[userID,songID]);
        return 0;
    
    }
    else
    {
        return -1;
    }

}

module.exports = saveFile;