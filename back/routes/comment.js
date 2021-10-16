const express = require('express');
const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
  try {
    // 여기에 뭐를 넣어야하지?
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// liker add
router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await comment.addLiker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// liker remove
router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).send('댓글이 존재하지 않습니다.');
    }
    await comment.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// liker count
// router.get('/:id/countLikers', async (req, res, next) => {
//   try {
//     const comment = await db.Comment.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!comment) {
//       return res.status(404).send('댓글이 존재하지 않습니다.');
//     }
//     const likers = await db.Like.findAndCountAll({
//       where: {
//         CommentId: req.params.id,
//       },
//     });
//     return res.json(likers.count);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// Disliker add
router.post('/:id/dislike', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).send('댓글이 존재하지 않습니다.');
    }
    await comment.addDisliker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Disliker remove
router.delete('/:id/dislike', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await comment.removeDisliker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// disliker count
// router.get('/:id/countDislikers', async (req, res, next) => {
//   try {
//     const comment = await db.Comment.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!comment) {
//       return res.status(404).send('댓글이 존재하지 않습니다.');
//     }
//     const dislikers = await db.Dislikers.findAndCountAll({
//       where: {
//         CommentId: req.params.id,
//       },
//     });
//     return res.json(dislikers.count);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
