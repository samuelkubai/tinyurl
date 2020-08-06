import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const save = (code, url) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO codes (code, destination) VALUES ($1, $2) RETURNING *', [code, url], (error, results) => {
      if (error) return reject(error);

      return resolve(results);
    })
  });
}

export const get = (code) => new Promise((resolve, reject) => {
  pool.query('SELECT * FROM codes WHERE code = $1', [code], (error, results) => {
    if (error) return reject(error);

    return resolve(results)
  })
})
