import { Router } from 'express'
import { getById, getByUserId, create, update, remove } from '../controllers/collectionController.js'
import authMiddleware from '../middleware/authenticate.js'

const router = Router()

router.get('/user/:userId', getByUserId)
router.get('/:id', getById)
router.post('/', authMiddleware, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

export default router
