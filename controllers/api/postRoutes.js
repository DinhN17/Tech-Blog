const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create a post
router.post('/', withAuth, async (req, res) => {
  // expects req.body =  
  // { 
  //    title: 'Taskmaster goes public!',
  //    content: 'https://taskmaster.com'
  // }

  try {
    req.body["user_id"] = parseInt(req.session.user_id);
    const newPost = await Post.create(req.body);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    userId = parseInt(req.session.user_id);
    if (req.params.id && req.body) {
      const postData = await Post.update(
        { 
          title: req.body.title,
          content: req.body.content
        },
        {
        where: {
          id: req.params.id,
          user_id: userId
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      };

      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: 'No post found with this id!' });
    };
    
    } catch (err) {
        res.status(500).json(err);    
    };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    if (req.params.id) {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: parseInt(req.session.user_id),
        },
      });
      
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      };
      res.status(200).json(postData);
    } else {
      res.status(404).json({ message: 'No post found with this id!' });
    };
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
