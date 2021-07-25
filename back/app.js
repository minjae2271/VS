const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');

const prod = process.env.NODE_ENV === 'production';

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagsRouter = require('./routes/hashtags');
const postCharactersRouter = require('./routes/postCharacters');
const authRouter = require('./routes/auth');
const db = require('./models');
const app = express();

dotenv.config();

// db.sequelize.sync({ force: true });
db.sequelize.sync({ force: false });
passportConfig();

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: ['https://murpick.com', 'https://www.murpick.com'],
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod && '.murpick.com',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕! 바보야?');
});

app.use('/user', userRouter);
app.use('/postCharacters', postCharactersRouter);
app.use('/hashtags', hashtagsRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);

app.listen(prod ? process.env.PORT : 3005, () => {
  console.log(`backend server ${prod ? process.env.PORT : 3005}`);
});
