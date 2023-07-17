const router = require('express').Router();
const { Posts, User, Comments } = require('../models');

router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      attributes: ['title', 'content', 'date_created', 'id'],
      include: [{ model: User, attributes: ['name'] }],
    });

    const loggedInUser = req.session.user;

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('all', {
      logged_in: req.session.logged_in,
      loggedInUser,
      posts,
      mainTemplate: 'main',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/newpost', async (req, res) => {
  const loggedInUser = req.session.user;
  res.render('newpost', {
    logged_in: req.session.logged_in,
    loggedInUser,
  });
});

router.get('/home', async (req, res) => {
  try {
    const loggedInUser = req.session.user;
    console.log(loggedInUser); // Check the value of loggedInUser

    const postsData = await Posts.findAll({
      attributes: ['title', 'content', 'date_created', 'id'],
      include: [{ model: User, attributes: ['id', 'name'] }],
      where: {
        user_id: loggedInUser.id,
      },
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('home', {
      logged_in: req.session.logged_in,
      loggedInUser,
      posts,
      mainTemplate: 'main',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/thread/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch the post by ID
    const postData = await Posts.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Extract the post and comments data
    const post = postData.get({ plain: true });
    const comments = post.comments;

    // Render the thread template and pass the post and comments data
    res.render('thread', {
      logged_in: req.session.logged_in,
      loggedInUser: req.session.user,
      post,
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/', async (req, res) => {
  res.render('login');
});

module.exports = router;
