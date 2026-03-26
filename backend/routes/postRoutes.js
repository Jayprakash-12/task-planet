import express from 'express';
import { createPost, getPosts, likePost, commentPost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id/like')
    .put(protect, likePost);

router.route('/:id/comment')
    .post(protect, commentPost);

export default router;
