const express = require('express');
const { createPost } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createPost);

module.exports = router;
