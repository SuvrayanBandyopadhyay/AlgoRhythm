const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function checkLogin(username,password) {
  

    const [rows] = await pool.query(`
        SELECT * from users where
        username = \"${username}\" and 
        password_hash = \"${password}\"
    `, [username,password]);
    
    //If match found
    if(rows.length==1)
    {
        return rows[0];
    }
    else
    {
        return -1;
    }

}

module.exports = checkLogin;