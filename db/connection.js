const mariadb = require("mariadb")

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    conenectionLimit: process.env.DB_CONN_LIMIT, 
}

const pool = mariadb.createPool(config)

module.exports = pool