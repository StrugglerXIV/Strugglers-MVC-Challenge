const router = require('express').Router();
const { Posts, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const { post_id, content } = req.body;
    console.log(req.body);
    console.log(req.session.user.id);

    // Create the new comment with the current user's ID and the provided post ID
      await Comments.create({
      user_id: req.session.user.id,
      post_id,
      content,
    });

    res.redirect('/thread/' + post_id);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment by ID and user ID
    const comments = await Comments.findOne({
      where: {
        id: commentId,
        user_id: req.session.user.id,
      },
    });

    if (!comments) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Delete the comment
    await Comments.destroy({
      where: {
        id: commentId,
        user_id: req.session.user.id,
      },
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
