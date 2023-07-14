const router = require('express').Router();
const { Posts } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Posts.findAll();
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  try {
    const newPosts = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const PostsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostsData) {
      res.status(404).json({ message: 'No Posts found with this id!' });
      return;
    }

    res.status(200).json(PostsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
