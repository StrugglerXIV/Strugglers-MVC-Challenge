const router = require('express').Router();
const { Posts, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  try {
    const loggedInUser = req.session.user.id;
    console.log(loggedInUser);
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user.id,
    });

    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and user ID
    const post = await Posts.findOne({
      where: {
        id: postId,
        user_id: req.session.user.id,
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Delete the post
    await Posts.destroy({
      where: {
        id: postId,
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
