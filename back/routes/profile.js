const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const profile = await db.User.findOne({
      attributes: ['id', 'nickname', 'createdAt', 'email'],
      where: {
        id: req.params.id,
      },
    });
    return res.json(profile);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
