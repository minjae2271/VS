const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path')
const { isLoggedIn } = require('./middlewares');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
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

router.post('/', isLoggedIn,  (req, res) => {

});

module.exports = router;