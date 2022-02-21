const pg = require("pg");

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
}

const pool = new pg.Pool(config);


async function getUserById(id) {
    let response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    
    if (response.rowCount != 0) {
        return response.rows[0];
    }
}

async function getUserByUsername(username) {
    let response = await pool.query("SELECT password FROM users WHERE username = $1", [username]);
    
    if (response.rowCount != 0) {
        return response.rows[0];
    }
}

async function createUser(data) {
    let query = "INSERT INTO users(name, gender, phone, email, username, password, province, city, street, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id";

    let response = await pool.query(query, data);

    if (response.rowCount != 0) {
        return response.rows[0];
    }    
}

module.exports = {
    getUserById,
    getUserByUsername,
    createUser
}
