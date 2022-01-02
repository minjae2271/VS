const express = require('express');
const { sequelize } = require('../models');
const db = require('../models');

const router = express.Router();

router.get('/loadTopPosts', async (req, res, next) => {
    try{
      const topPosts = await db.Pick.findAll({
        // raw:true,
        attributes: ['PostId', [db.Sequelize.fn("count", 'PostId'), "count"]], //select count(*) from picks group by PostId
        group: 'PostId',
        include: [
          {
            model: db.Post,
            include: [
              {
                model: db.User,
                attributes: ['id', 'nickname']
              },
            ],
          },
        ],
        limit: 5
      });
      let topPostsRes = []
      for(let i in topPosts){
        // console.log(topPosts[i]["Post"]["dataValues"])
        let topPostId = topPosts[i]["Post"]["dataValues"]["id"];
        const topPostsUrl = await db.Image.findAll({
            raw:true,
            where: {
                postId: topPostId,
            }
        });
        topPosts[i]["Post"]["dataValues"]["Images"] = topPostsUrl;
        topPostsRes.push(topPosts[i]["Post"])
      }
      return res.json(topPostsRes);
    }catch(err){
      console.error(err);
      next(err);
    }
  });

  router.get('/balanced', async (req, res, next) => {
    try{
      
    }catch(err){
      console.error(err);
      next(err);
    }
  })

module.exports = router;