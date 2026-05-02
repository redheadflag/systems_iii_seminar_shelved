const pool = require('../config/db');

async function findByUsername(username) {
  const [rows] = await pool.query(
    'SELECT id, username, password_hash, joined_at FROM `user` WHERE username = ?',
    [username]
  );
  return rows[0] || null;
}

async function create(username, passwordHash) {
  const [result] = await pool.query(
    'INSERT INTO `user` (username, password_hash) VALUES (?, ?)',
    [username, passwordHash]
  );
  return { id: result.insertId, username };
}

module.exports = {
  findByUsername,
  create,
};
