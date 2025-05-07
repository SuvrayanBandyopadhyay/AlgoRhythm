const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
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
        username = \"${username}\"
    `, [username]);
    
    //If match found
    if(rows.length==1)
    {
        passhash = rows[0].password_hash;

        const match = await bcrypt.compare(password,passhash);
        if(match)
        {
                return rows[0].id;
        }
        else
        {
            return -1;
        }
    }
    else
    {
        return -1;
    }

}

module.exports = checkLogin;