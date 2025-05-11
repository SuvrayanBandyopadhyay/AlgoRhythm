const mysql = require('mysql2');
const dotenv = require('dotenv');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getLatestItems(existingCount){
    try {
        const [results, fields] = await pool.query(
          'SELECT * FROM songs ORDER BY views DESC LIMIT 20'
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

module.exports = getLatestItems;


