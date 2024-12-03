const { pool } = require("../config/db");
require('dotenv').config()

const createMedicationTable = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS medications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        dosage VARCHAR(100),
        scheduled_time DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);
};

async function addMedicine(user_id,name,dosage,scheduled_time){
    try {
        const query = 'INSERT INTO medicines (user_id, name, dosage, scheduled_time) VALUES (?, ?, ?, ?)'
        const result = await pool.query(query,[user_id,name,dosage,scheduled_time])
        const savedMedicine = {
            id:result[0].insertId,
            user_id,
            name,
            dosage,
            scheduled_time
        }
        return savedMedicine
    } catch (error) {
        throw new Error(error)
    }
}

async function getMedicineByUserId(userId){
    try {
        const query = 'SELECT * FROM medicines where user_id = ?'
        const result = await pool.query(query,[userId])
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {createMedicationTable, addMedicine, getMedicineByUserId}
