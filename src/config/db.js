const { Pool } = require("pg");

const pool = new Pool({
  connectionString: 'postgresql://postgres:vaishnavipatil%40gmail.com@db.tzosbsmwqnogyqdqscbb.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log("Supabase Database connected"))
  .catch((err) => console.log("DB connection error:", err.message));

module.exports = pool;