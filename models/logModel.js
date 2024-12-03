const { pool } = require('../config/db');

require('dotenv').config()

const createLogTable = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS acknowledgements_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        medication_id INT NOT NULL,
        status ENUM('taken', 'missed') NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (medication_id) REFERENCES medications(id)
    );
    `);
};

async function addLog(user_id, medication_id, status){
    try {
        const query = 'INSERT INTO acknowledgements_logs(user_id, medicine_id, status) VALUES (?,?,?)'
        const result = await pool.query(query,[user_id,medication_id,status])
        const savedLog = {
            id:result[0].insertId,
            user_id,
            medication_id,
            status
        }
        return savedLog
    } catch (error) {
        throw new Error(error)
    }
}

async function getLogs(){
    try {
        const query = 'SELECT * FROM acknowledgements_logs'
        const result = await pool.query(query,[])
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createLogTable, addLog, getLogs
}