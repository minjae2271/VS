const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const db = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser( async (id, done) => {
        try{
            const user = await db.User.findOne({
                where: { id },
                attributes: ['id', 'nickname'],
            });
            return done(null, user); //req.user , req.isAuthenticated === true
        }
        catch(err){
            console.error(err);
            return done(err);
        }
    });
    local();
    kakao();
}