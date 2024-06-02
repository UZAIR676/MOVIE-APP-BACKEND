import express from 'express';
import { loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js';
import { protect } from '../Middlewares/Auth.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.put('/', protect, updateUserProfile);

export default router;
