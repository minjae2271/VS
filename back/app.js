const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagsRouter = require('./routes/hashtags');
const db = require('./models');
const app = express();

//db.sequelize.sync({ force: true });
db.sequelize.sync({ force: false });
passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtags', hashtagsRouter);

app.listen(3005, () => {
  console.log(`backend server ${3005}`);
});
