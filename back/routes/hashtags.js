const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const hashtags = await db.Hashtag.findAll({

        });
        return res.json(hashtags);
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;