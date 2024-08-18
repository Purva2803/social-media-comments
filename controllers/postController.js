const Post = require('../models/Post');
// creating post (here we are assuming that the database is empty)
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      title,
      content,
      userId: req.userId, // Assuming the user is authenticated
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};
