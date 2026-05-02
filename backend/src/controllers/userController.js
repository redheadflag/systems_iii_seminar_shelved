const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/userModel');

function signToken(user) {
  return jwt.sign({ userId: user.id }, config.jwt.secret);
}

async function login(req, res, next) {
  const { username, password } = req.body;

  if (username == null || password == null) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const user = await userModel.findByUsername(username)
  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (user === null || !passwordMatches) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const token = signToken(user);

  return res.status(200).json({
    user_id: user.id,
    token,
  });
}

async function signUp(req, res, next) {
    const { username, password } = req.body;

    if (username == null || password == null) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    if (password.length < config.min_password_len) {
      return res.status(400).json({error: `password must be at least ${config.min_password_len} characters`});
    }

    const isExistingUsername = await userModel.findByUsername(username);
    if (isExistingUsername) {
      return res.status(400).json({error: 'username already taken'});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.create(username, passwordHash);
    const token = signToken(user);

    return res.status(201).json({
      user_id: user.id,
      token,
    });
}

module.exports = {
  signUp,
  login,
};
