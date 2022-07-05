const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "F@zzieb75",
    host: "localhost",
    port: 5432,
    database: "mwa_proposals"
})

module.exports = pool

