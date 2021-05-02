const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/postType', async (req, res, next) => {
    try {
        const newPostType = await db.PostType.create({
            postTypeName: req.body.postType
        });
        return res.json(newPostType);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/postType', async (req, res, next) => {
    try {
        const postTypes = await db.PostType.findAll({

        });
        return res.json(postTypes);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;