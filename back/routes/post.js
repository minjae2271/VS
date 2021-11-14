const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const AWS = require('aws-sdk');

const path = require('path');
const { isLoggedIn } = require('./middlewares');
const multerS3 = require('multer-s3');

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'murpickbucket',
    key(req, file, cb) {
      console.log('multer -> file', file);
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limit: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), (req, res) => {
  console.log('req.files', req.files);
  res.json(req.files.map(v => v.location));
});

router.post('/', async (req, res, next) => {
  try {
    const hashtag = req.body.hashtag.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      postType: req.body.postType,
      postSubject: req.body.postSubject,
      postCategory: req.body.postCategory,
      title: req.body.title,
      content1: req.body.content1,
      content2: req.body.content2,
      condition: req.body.condition,
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

//게시글 업데이트
router.patch('/:id/update', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    await db.Post.update(
      {
        // postType: req.body.postType,
        // postCategory: req.body.postCategory,
        title: req.body.title,
        content1: req.body.content1,
        content2: req.body.content2,
        condition: req.body.condition,
        // UserId: req.user.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send(req.body.title);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    await db.Post.destroy({
      where: { id: req.params.id },
    });
    res.send({
      postId: req.params.id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.User, attributes: ['id', 'nickname'] },
        { model: db.Image },
        { model: db.Pick },
      ],
    });
    return res.json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:id/pick', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    const checkPick = await db.Pick.findOne({
      where: {
        PostId: post.id,
        UserId: req.user.id,
      },
    });
    if (checkPick) {
      return res.status(403).send('이미 선택된 게시글입니다.');
    }

    const newPick = await db.Pick.create({
      PostId: post.id,
      UserId: req.user.id,
      contentNum: req.body.contentNum,
    });

    const pick = await db.Pick.findOne({
      where: {
        id: newPick.id,
      },
      include: [
        {
          model: db.Post,
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.json(pick);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id/picks', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    const picks = await db.Pick.findAll({
      where: {
        postId: req.params.id,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.json(picks);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: db.User,
          as: 'Dislikers',
          attributes: ['id'],
        },
      ],
      order: [['createdAt', 'Asc']],
      offset: (parseInt(req.query.page, 10) - 1) * 10,
      limit: parseInt(req.query.limit, 10),
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id/countComments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAndCountAll({
      where: {
        PostId: req.params.id,
      },
    });
    return res.json(comments.count);
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

    const pick = await db.Pick.findOne({
      where: {
        postId: req.params.id,
        userId: req.user.id,
      },
    });
    if (!pick) {
      return res.status(403).send('컨텐츠 중 하나를 선택하세요.');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
      commentType: pick.contentNum,
      group_id: req.body.group_id,
      parent_id: req.body.parent_id,
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

router.patch('/comment/:id', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({
      where: { id: req.params.id },
    });
    if (!comment) {
      return res.status(404).send('댓글이 존재하지 않습니다.');
    }
    await db.Comment.update(
      { content: req.body.content },
      { where: { id: req.params.id } }
    );
    return res.json(req.body.content);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/comment/:id', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res.status(404).send('댓글이 존재하지 않습니다.');
    }
    await db.Comment.destroy({
      where: { id: req.params.id },
    });
    res.send({
      commentId: req.params.id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:id/viewCnt', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).send('게시물이 존자하지 않습니다.');
    }
    // console.log("before:" ,post)
    await db.Post.update(
      {
        view_cnt: post.view_cnt + 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // console.log("after:",post)
    return res.json();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
