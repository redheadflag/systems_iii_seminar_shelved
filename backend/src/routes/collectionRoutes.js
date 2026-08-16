import { Router } from 'express'
import { get, getByUserId, create, update, remove } from '../controllers/collectionController.js'
import authMiddleware from '../middleware/authenticate.js'
import validateRequired from '../middleware/validateRequired.js'
import authorizeCollectionOwner from '../middleware/authorizeCollectionOwner.js'
import pickFields from '../middleware/pickFields.js'

const router = Router()

router.get('/user/:userId', getByUserId)
router.get('/:id', get)
router.post('/', authMiddleware, validateRequired(['name']), create)
router.put('/:id', authMiddleware, authorizeCollectionOwner, pickFields(['name', 'description', 'is_public']), update)
router.delete('/:id', authMiddleware, authorizeCollectionOwner, remove)

export default router
