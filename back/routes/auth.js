const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

router.post('/mail', async (req, res, next) => {
    try{
        let authNum = Math.random().toString().substr(2,6);
        let emailTemplate;
    
        ejs.renderFile(appDir+'/template/emailTemplate.ejs', {authCode : authNum}, function (err, data) {
            if(err){
                console.error(err);
                next(err);
            }
            emailTemplate = data;
        });
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
    
        let mailOptions = await transporter.sendMail({
            from: `Murpick`,
            to: req.body.email,
            subject: '머픽 회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplate,
        });
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(err);
                next(err);
            }
            console.log("Finish sending email : " + info.response);
            transporter.close()
        });
        return res.json(authNum);
    } catch(err){
        console.error(err);
        next(err);
    }
    
});

module.exports = router;