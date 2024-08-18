const Comment = require('../models/Comment');

// Create a comment for a post
exports.createComment = async (req, res) => {
  const { text } = req.body;

  try {
    const comment = new Comment({
      postId: req.params.postId,
      userId: req.userId,
      text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Reply to an existing comment
exports.replyToComment = async (req, res) => {
  const { text } = req.body;

  try {
    const reply = new Comment({
      postId: req.params.postId,
      userId: req.userId,
      text,
      parentCommentId: req.params.commentId,
    });
    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ error: 'Failed to create reply' });
  }
};

// Get all comments for a specific post
exports.getCommentsForPost = async (req, res) => {
  const { sortBy = 'createdAt', sortOrder = 'asc' } = req.query;

  try {
    // Get top-level comments (those without a parent)
    const comments = await Comment.find({ postId: req.params.postId, parentCommentId: null })
      .sort({ [sortBy]: sortOrder })
      .lean(); // `lean()` is used for performance improvement during read operations

    // Manually fetch replies for each comment
    const populatedComments = await Promise.all(
      comments.map(async (comment) => {
        // Fetch the two most recent replies for each top-level comment
        const replies = await Comment.find({ parentCommentId: comment._id })
          .sort({ createdAt: -1 }) // Sort by latest reply
          .limit(2)
          .lean();

        // Count total replies for each comment
        const totalReplies = await Comment.countDocuments({ parentCommentId: comment._id });

        // Return comment along with its replies and total reply count
        return {
          ...comment,
          replies,
          totalReplies,
        };
      })
    );

    res.json(populatedComments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};
exports.expandComments = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    // Paginate the replies for the given parent comment (top-level comment)
    const replies = await Comment.find({ parentCommentId: req.params.commentId })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize))
      .sort({ createdAt: 'asc' })
      .lean();

    res.json(replies);
  } catch (error) {
    console.error('Error expanding comments:', error);
    res.status(500).json({ error: 'Failed to expand comments' });
  }
};
