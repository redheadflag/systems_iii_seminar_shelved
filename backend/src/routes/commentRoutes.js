import { Router } from 'express'
import authMiddleware from '../middleware/authenticate.js'
import validateRequired from '../middleware/validateRequired.js'
import { create } from '../controllers/commentController.js'

const router = Router()

router.post('/', authMiddleware, validateRequired(['card_id', 'user_id', 'comment']), create)

export default router
