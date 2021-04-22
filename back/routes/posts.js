const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: { [db.Sequelize.Op.gt]: parseInt(req.query.lastId, 10) },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
        {
          model: db.Hashtag,
        },
        {
          model: db.Pick,
        }
      ],
      order: [['createdAt', 'ASC']],
      limit: parseInt(req.query.limit, 10) || 10,
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
