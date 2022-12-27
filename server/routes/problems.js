import express from "express";

import { getProblems, getProblem, createProblem, addProblemToFavorites, updateUserResult, updateResultComments, getComments, editProblem, deleteProblem, getFavoriteProblems } from '../controllers/problems.js'

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getProblems);
router.get('/:id', auth, getProblem);
router.post('/create', auth, createProblem);
router.get('/favorites/:userId', auth, getFavoriteProblems);
router.delete('/:id/delete', auth, deleteProblem);
router.patch('/:id/edit', auth, editProblem);
router.patch('/:id/addToFavorites', auth, addProblemToFavorites);
router.patch('/:id/updateResult/:userId', auth, updateUserResult);
router.patch('/:id/updateResultComments/:userId', auth, updateResultComments);
router.get('/:id/comments/:userId', auth, getComments);

export default router;