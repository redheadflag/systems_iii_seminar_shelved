const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/sign-up', userController.signUp);
router.get('/:username', userController.getByUsername);

module.exports = router;
