const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');
const { isLoggedIn } = require('./middlewares');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + Date.now() + ext);
    },
  }),
  limit: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), (req, res) => {
  res.json(req.files.map(v => v.filename));
});

router.post('/', async (req, res, next) => {
  try {
    const hashtag = req.body.hashtag.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      postType: req.body.postType,
      postCategory: req.body.postCategory,
      title: req.body.title,
      content1: req.body.content1,
      content2: req.body.content2,
      UserId: req.user.id,
    });
    if (hashtag) {
      const result = await Promise.all(
        hashtag.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        await Promise.all(
          req.body.image.map(image => {
            return db.Image.create({
              src: image,
              PostId: newPost.id,
            });
          })
        );
      } else {
        return res.status(403).send('2개의 이미지가 필요합니다.');
      }
    }

    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });
    return res.json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const comments = db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
      commentType: 1,
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
