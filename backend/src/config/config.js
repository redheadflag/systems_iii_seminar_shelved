require('dotenv').config();

module.exports = {
  port: 3000,
  min_password_len: process.env.MIN_PASSWORD_LENGTH,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
