import express from 'express';
import { register, login, logout } from '../controllers/users/authController.js';
import { validateRegisterInput } from '../middlewares/validateInput.middleware.js';

const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', login);
router.post('/logout', logout);

export default router;