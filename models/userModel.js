const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

// Create user table
const createUserTable = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('ADMIN', 'USER') DEFAULT 'USER',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);
};

// Register a new user
const registerUser = async (name, email, password) => {
    try {
        console.log('inside regsiter user function', name, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        console.log('result = ', result);
        return { id: result.insertId, name, email, role: 'user' };
    } catch (error) {
        throw new Error(error)
    }
};

// Find user by email
const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(result[0][0])
    return result[0][0];
};

module.exports = { createUserTable, registerUser, findUserByEmail };
