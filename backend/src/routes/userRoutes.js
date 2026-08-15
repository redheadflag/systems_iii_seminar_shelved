import { Router } from 'express';
import { login, signUp, getByUsername } from '../controllers/userController.js';

const router = Router();

router.post('/login', login);
router.post('/sign-up', signUp);
router.get('/:username', getByUsername);

export default router;
