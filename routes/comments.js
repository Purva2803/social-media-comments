const express = require('express');
const {
  createComment,
  replyToComment,
  getCommentsForPost,
  expandComments,
} = require('../controllers/commentController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting
const commentLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX, // Limit each IP
  message: 'Too many requests from this IP, please try again later',
});

// Comment routes
router.post('/:postId/comments', auth, commentLimiter, createComment);
router.post('/:postId/comments/:commentId/reply', auth, commentLimiter, replyToComment);
router.get('/:postId/comments', auth, getCommentsForPost);
router.get('/:postId/comments/:commentId/expand', auth, expandComments);

module.exports = router;
