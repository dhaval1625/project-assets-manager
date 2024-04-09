require('dotenv').config();

const DB_URL = process.env.DB_URL;

const JWT_SECRET = process.env.JWT_SECRET;

const TOKEN_EXP_HOURS = 12;

module.exports = { DB_URL, JWT_SECRET, TOKEN_EXP_HOURS };
