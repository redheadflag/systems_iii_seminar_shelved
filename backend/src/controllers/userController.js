import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js'
import userRepository from '../repositories/userRepository.js'

function signToken(userId) {
  return jwt.sign({ userId }, config.jwt.secret)
}

async function login(req, res, next) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            error: 'username and password are required'
        })
    }

    const user = await userRepository.getByUsername(username)

    if (user === null) {
        return res.status(401).json({
            error: 'invalid credentials'
        })
    }

    const passwordMatches = await compare(password, user.password_hash)

    if (!passwordMatches) {
        return res.status(401).json({
            error: 'invalid credentials'
        })
    }

    const token = signToken(user)

    return res.status(200).json({
        user_id: user.id,
        token,
    })
}



async function signUp(req, res, next) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            error: 'username and password are required'
        })
    }

    if (password.length < min_password_len) {
        return res.status(400).json({
            error: `password must be at least ${min_password_len} characters`
        })
    }

    const existingUser = await userRepository.getByUsername(username)

    if (existingUser !== null) {
        return res.status(400).json({
            error: 'username already taken'
        })
    }

    const passwordHash = await hash(password, 10)

    const user = await userRepository.create({
        username,
        password_hash: passwordHash
    })

    const token = signToken(user)

    return res.status(201).json({
        user_id: user.id,
        token,
    })
}


async function getByUsername(req, res, next) {
    const { username } = req.params

    const user = await userRepository.getByUsername(username)

    if (user === null) {
        return res.status(404).json({
            error: 'user not found'
        })
    }

    return res.status(200).json(user)
}

export {
  signUp,
  login,
  getByUsername,
}