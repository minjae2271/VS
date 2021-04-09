const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        let where = {};
        if(parseInt(req.query.lastId, 10)){
            where = {
                id: {
                    [db.Sequelize.Op.lt]:  parseInt(req.query.lastId, 10),
                },
            };
        }
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }],
            order: [['createdAt', 'ASC']],
            limit: parseInt(req.query.limit, 10) || 10,
        });
        return res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;