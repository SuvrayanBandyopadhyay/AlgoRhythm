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
    if(password==confirm_password)
    {
        return -1;
    }

    //Check if username or email exists
    const [rows] = await pool.query(`
        SELECT * from users where
        username = \"${username}\" or 
        email = \"${email}\"
    `, [username,password]);
    
    //If match found
    if(rows.length==1)
    {
        return -2;
    }
    
    
    //Now we can add the new user  
    const salt_rounds = 10;

    bcrypt.genSalt(salt_rounds,(err,salt)=>
        {
            if(err)
                {
                    return -3 //Internal error
                }
        });

    //Now we hash the password
    bcrypt.hash(password,salt,(err,hash)=>
        {
            if(err)
                {
                    return -3 //Internal error
                }
        });
    
    //Now we insert
    const result = await pool.query(
        "INSERT INTO users(username,email,password_hash,create_timestamp) values ($1,$2,$3,curdate())",(username,email,bcrypt.hash)
    );
    
    return 0;
}

module.exports = checkRegister;