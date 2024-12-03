const {mysql2, createPool} = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function connectToDB(){
    try {
        await pool.getConnection()
        console.log('database connected successfully');
    } catch (error) {
        console.error('error connecting in database', error.message)
        process.exit(1)
    }

}

module.exports = {pool, connectToDB}