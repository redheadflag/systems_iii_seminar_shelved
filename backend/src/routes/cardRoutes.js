import { Router } from 'express'
import { get, list, create, update, remove } from '../controllers/cardController.js'
import authMiddleware from '../middleware/authenticate.js'
import validateRequired from '../middleware/validateRequired.js'
import authorizeCardOwner from '../middleware/authorizeCardOwner.js'
import pickFields from '../middleware/pickFields.js'

const router = Router()

router.get('/', list)
router.get('/:id', get)
router.post('/', authMiddleware, validateRequired(['collection_id', 'title']), create)
router.put('/:id', authMiddleware, authorizeCardOwner, pickFields(['title', 'description', 'picture_media_id', 'is_tradeable']), update)
router.delete('/:id', authMiddleware, authorizeCardOwner, remove)

export default router
