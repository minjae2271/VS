const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

// router.get('/', isLoggedIn, async (req, res, next) => {
//     const user = req.user;
//     res.json(user);
// });

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser){
            return res.status(403).json({
                errorCode: 1,
                message: "이미 가입된 이메일입니다."
            })
        }
        await db.User.create({
            // where: {
                email: req.body.email,
                nickname: req.body.nickname,
                password: hash,
            // }
        });
        passport.authenticate('local', (err, user, info) => {
            if(err){
                return next(err);
            }
            if(info){
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err) => { //session 사용자 정보 저장 -> index.js (serializer)
                if(err){
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
            })
        })(req, res, next);
    }
    catch(err) {
        next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (info) {
          return res.status(401).send(info.reason);
        }
        return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
          if (err) {
            console.error(err);
            return next(err);
          }
          return res.json(user);
        });
      })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    if(req.isAuthenticated()){
        req.logout();
        req.session.destroy();
        return res.status(200).send('로그아웃 되었습니다.')
    }
});

module.exports = router; 
