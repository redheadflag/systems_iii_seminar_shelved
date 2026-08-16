import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Authorization token required'
        })
    }

    const token = authHeader.slice('Bearer '.length)

    try {
        const payload = jwt.verify(token, config.jwt.secret)
        req.user = { id: payload.userId }
        next()
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        })
    }
}

export default authMiddleware