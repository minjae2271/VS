const express = require('express');
const db = require('../models');

const router = express.Router();

//postType
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
});

router.delete('/:id/postType', async (req, res, next) => {
    try{
        const postType = await db.PostType.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!postType){
            return res.status(403).send("존재하지 않는 대분류입니다.")
        }
        await db.PostType.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send("대분류가 삭제되었습니다.")
    }catch(err){
        console.error(err);
        next(err);        
    }
})

//postSubject
router.post('/postSubject', async (req, res, next) => {
    try{
        const newPostSubject = await db.PostSubject.create({
            postSubjectName: req.body.postSubject,
            PostTypeId: req.body.postTypeId
        });
        const fullPostSubject = await db.PostSubject.findOne({
            where: {
                id: newPostSubject.id
            }
        });
        return res.json(fullPostSubject);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/postSubject', async (req, res, next) => {
    try{
        const postSubjects = await db.PostSubject.findAll({
            include: [{
                model: db.PostType
            }]
        });
        return res.json(postSubjects);
    }catch(err){
        console.error(err);
        next(err);
    }
})

//postCategory
router.post('/postCategory', async (req, res, next) => {
    try{
        const newPostCategory = await db.PostCategory.create({
            postCategoryName: req.body.postCategory
        });
        return res.json(newPostCategory);
    }catch(err){
        console.error(err);
        next(err);        
    }
});

router.get('/postCategory', async (req, res, next) => {
    try{
        const postCategories = await db.PostCategory.findAll({

        });
        return res.json(postCategories);
    }catch(err){
        console.error(err);
        next(err);     
    }
})

module.exports = router;