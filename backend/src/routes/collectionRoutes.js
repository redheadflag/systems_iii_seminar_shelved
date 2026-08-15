import { Router } from 'express'
import { getById, getByUserId, create, update, remove } from '../controllers/collectionController.js'

const router = Router()

router.get('/user/:userId', getByUserId)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
