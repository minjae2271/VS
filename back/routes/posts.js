const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }],
            order: [['createdAt', 'ASC']]
        });
        return res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;