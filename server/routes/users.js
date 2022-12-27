import express from "express";

import { signup, login, getUserById, getUsers, updateUserProfile, updateUserAvatar, verifyUser, getUserByEmail, requestTeacherAccount, confirmTeacherApproval, sendResetPasswordLink, changePassword, changePasswordWithAuth } from '../controllers/users.js'

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.patch('/:id/updateProfile', auth, updateUserProfile);
router.patch('/:id/updateAvatar', auth, updateUserAvatar);
router.post('/login', login);
router.post('/signup', signup);
router.patch('/:id/confirm', verifyUser);
router.post('/:id/confirmTeacherApproval', confirmTeacherApproval);
router.post('/:id/sendResetPasswordLink', sendResetPasswordLink);
router.patch('/:id/changePassword', changePassword);
router.patch('/:id/changePasswordWithAuth', auth, changePasswordWithAuth);
router.patch('/:id/requestTeacherAccount', auth, requestTeacherAccount);

export default router;