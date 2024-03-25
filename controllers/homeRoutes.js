const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, 
      {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      }
    );
    var post = postData.get({ plain: true });

    const commentData =await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    post["comments"] = commentData.map((comment) => comment.get({ plain: true }));

    // console.log(post);
    // console.log(comments);

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/new-post', withAuth, async (req, res) => {
  try {
    res.render('new-post', { 
      layout: 'dashboard',
      logged_in: req.session.logged_in 
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    if (req.params.id) {
      res.render('edit-post', {
        id: req.params.id,
        layout: 'dashboard',
        logged_in: req.session.logged_in
      });
      
    } else {
      
    }
  } catch (error) {
    
  }
})

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
          {
              model: User,
              attributes: ['username'],
          },
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      element["href"] = `/edit-post/${element.id}`;
    };

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        layout: 'dashboard',
        posts, 
        logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    for (let index = 0; index < posts.length; index++) {
      const element = posts[index];
      element["href"] = `/post/${element.id}`;
    };

    // Pass serialized data and session flag into template
    res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
