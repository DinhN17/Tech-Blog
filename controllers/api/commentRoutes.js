const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// post comment
// expects req.body =
// {
//     content: 'This is a comment',
//     post_id: 1
// }
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        req.body["user_id"] = parseInt(req.session.user_id);
        // const newComment = await Comment.create({
        //     content: req.body.content,
        //     user_id: parseInt(req.session.user_id),
        //     post_id: parseInt(req.body.post_id)
        // });

        console.log(req.body);
        const newComment = await Comment.create(req.body);

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    };
});

// update comment
// expects req.body =
// {
//     content: 'This is a comment',
//     post_id: 1
// }
router.put('/:id', withAuth, async (req, res) => {
   try {
       const commentData = await Comment.update({
           ...req.body,
           user_id: req.session.user_id,
       },
       {
           where: {
               id: req.params.id,
           },
       });
       
       if (!commentData) {
           res.status(404).json({ message: 'No comment found with this id!' });
           return;
       };

       res.status(200).json(commentData);
   } catch (err) {
       res.status(500).json(err);
   };
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        };

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;