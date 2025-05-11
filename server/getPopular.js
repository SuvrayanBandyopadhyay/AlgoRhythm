const mysql = require('mysql2');
const dotenv = require('dotenv');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getPopularItems(existingCount){
    try {
        const [results, fields] = await pool.query(
          `select songs.* from user_song_authorship,songs,(select user_id,sum(views) 
          as pop from user_song_authorship,songs where user_song_authorship.song_id = songs.id 
          group by user_id) as t where user_song_authorship.song_id = songs.id 
          and user_song_authorship.user_id = t.user_id order by pop desc;`
        );
    
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available

        // Use results.length instead of length(rows)
        return {items : results.slice(existingCount, (existingCount + 3 > results.length) ? results.length : existingCount + 3) ,hasAll: (existingCount + 3 > results.length) ? true : false};
    } catch (err) {
        console.log(err);
        return { items : [],hasAll : false};
    }
}

module.exports = getPopularItems;


