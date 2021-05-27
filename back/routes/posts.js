const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:postTypeId', async (req, res, next) => {
  try {
    let where = {
      postType: parseInt(req.params.postTypeId, 10),
    };
    
    if (parseInt(req.query.lastId, 10)) {
      where[db.Sequelize.Op.gt] = parseInt(req.query.lastId, 10)
    };
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

router.post('/loadSearchPosts', async (req, res, next) => {
  try {
    let where = {
      postType: req.body.postTypeId,
      postSubject: req.body.postSubjectId,
    };

    if(req.body.postCategoryId !== undefined){
      where['postCategory'] = req.body.postCategoryId
    }
    
    if (parseInt(req.query.lastId, 10)) {
      where[db.Sequelize.Op.gt] = parseInt(req.query.lastId, 10) 
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

router.get('/loadTopPosts', async (req, res, next) => {
  try{
    const topPosts = await db.Pick.findAll({
      attributes: ['PostId', [db.Sequelize.fn("count", '*'), "count"]], //select count(*) from Posts group by PostId
      where: {
        PostId: {
          [db.Sequelize.Op.ne]: null
        }
      },
      group: 'PostId',
      include: [
        {
          model: db.Post,
          // include: [
          //   {
          //     model: db.User,
          //     attributes: ['id', 'nickname']
          //   }
          // ]
        }],
      limit: 5
    });
    return res.json(topPosts);
  }catch(err){
    console.error(err);
    next(err);
  }
})

module.exports = router;
