require('dotenv').config();

const DB_URL = process.env.DB_URL;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { DB_URL, JWT_SECRET };
