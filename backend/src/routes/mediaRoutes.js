import { Router } from 'express'
import { get, create } from '../controllers/mediaController.js'
import authMiddleware from '../middleware/authenticate.js'
import upload from '../middleware/upload.js'

const router = Router()

router.get('/:id', get)
router.post(
    '/',
    authMiddleware,
    upload.single('image'),
    create
)

export default router
