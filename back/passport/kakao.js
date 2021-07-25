const passport = require('passport');
const { User } = require('../models');

const KakaoStrategy = require('passport-kakao').Strategy;

module.exports=()=>{
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL:'http://localhost:3000/login_callback_kakao',
    }, async (accessToken,refreshToken,profile,done)=>{
        try{
            const exUser = await User.find({
                where:{
                    // snsId:profile.id,
                    // provider:'kakao'
                    email: profile._json.kaccount_email,
                    nickname: profile.displayName
                }
            });
            if(exUser){
                done(null,exUser);
            } else{
                const newUser = await User.create({
                    email:profile._json && profile._json.kaccount_email,
                    nickname:profile.displayName,
                    // snsId:profile.id,
                    // provider:'kakao',
                });
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};