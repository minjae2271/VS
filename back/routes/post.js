const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path')
const { isLoggedIn } = require('./middlewares');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { 
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename+ Date.now() + ext);
        },
    }),
    limit: { fileSize: 20 * 1024 * 1024 }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename)); 
});

router.post('/', isLoggedIn, async (req, res, next) => {
    try{
        const newPost = await db.Post.create({
            postType: req.body.postType,
            title: req.body.title,
            content1: req.body.content1,
            content2: req.body.content2,
            UserId: req.user.id,
        });

        if(req.body.image){
            if(Array.isArray(req.body.image)){
                await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({
                        src: image,
                        PostId: newPost.id
                    })
                }));
            } else {
                return res.status(403).send('2개의 이미지가 필요합니다.')
            }
        }

        const fullPost = await db.Post.findOne({
            where: { id: newPost.id},
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image
            }],
        });
        return res.json(fullPost);
    } catch(err){
        console.error(err);
        next(err);
    }

});

module.exports = router;