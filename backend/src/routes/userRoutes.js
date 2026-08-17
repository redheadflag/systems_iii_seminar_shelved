import { Router } from 'express';
import { login, signUp, getByUsername, get } from '../controllers/userController.js';

const router = Router();

router.post('/login', login);
router.post('/sign-up', signUp);
router.get('/username/:username', getByUsername);
router.get('/:id', get);

export default router;
