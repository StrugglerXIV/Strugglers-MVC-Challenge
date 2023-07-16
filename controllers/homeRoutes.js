const router = require('express').Router();
const { Posts, User } = require('../models');

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
  res.render('newpost', {
    logged_in: req.session.logged_in,
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

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/', async (req, res) => {
  res.render('login');
});

module.exports = router;
