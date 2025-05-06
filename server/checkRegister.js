const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function checkRegister(username,email,password,confirm_password) {
  
    //Check if password and confirm password match
    if(password!=confirm_password)
    {
        return -1;
    }

    //Check if password is long enough
    if(password.length<8)
    {
        return -2;
    }

    //Check if username or email exists
    const [rows] = await pool.query(`
        SELECT * from users where
        username = \"${username}\" or 
        email = \"${email}\"
    `, [username,password]);
    
    //If match found
    if(rows.length>0)
    {
        return -3;
    }
    
    //try adding new value with hash
    try
    {
        const saltrounds = 10;
        const hash = await bcrypt.hash(password,saltrounds);

        await pool.query("INSERT INTO users (username,email,password_hash,create_timestamp) VALUES (?,?,?,NOW())",[username,email,hash]);
        return 0;
    }
    catch(err)
    {
        return -4
    }
    

}

module.exports = checkRegister;