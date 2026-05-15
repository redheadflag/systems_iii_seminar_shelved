import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwt as _jwt, min_password_len } from '../config/config';
import { verifyUsername, create, findByUsername } from '../models/userModel';

function signToken(user) {
  return sign({ userId: user.id }, _jwt.secret);
}

async function login(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const user = await verifyUsername(username)
  const passwordMatches = await compare(password, user.password_hash);

  if (!passwordMatches) {
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

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    if (password.length < min_password_len) {
      return res.status(400).json({error: `password must be at least ${min_password_len} characters`});
    }

    const isExistingUsername = await verifyUsername(username);
    if (isExistingUsername) {
      return res.status(400).json({error: 'username already taken'});
    }

    const passwordHash = await hash(password, 10);

    const user = await create(username, passwordHash);
    const token = signToken(user);

    return res.status(201).json({
      user_id: user.id,
      token,
    });
}

async function getByUsername(req, res, next) {
  const { username } = req.params;

  const user = await findByUsername(username);
  if (user === null) {
    return res.status(404).json({ error: 'user not found' });
  }

  return res.status(200).json(user);
}

export default {
  signUp,
  login,
  getByUsername,
};
