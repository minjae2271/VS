<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const morgan = require('morgan')

const usersRouter = require('./routes/user');
const db = require('./models');
const app = express(); 

db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
})) ;
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', usersRouter);


app.listen(3005, () => {
    console.log(`backend server ${3005}`)
})
=======
const express = require("express");
const db = require("./models");
const passport = require("passport");

const userRouter = require("./routes/user");

const app = express();
db.sequelize.sync();

app.use(express.json()); // 요청형태가 Json이므로 해석 필요.
app.use(express.urlencoded({ extended: false }));
// Form에서 action을 전송할때 그 data를 해석해서 req body에 넣어준다.

app.get("/", (req, res) => {
  res.status(200).send("murpick backend");
});

// app.use("/user", userRouter);
app.post("/user", async (req, res, next) => {
  try {
    const newUser = await db.User.create({
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
    });
    //HTTP Status code
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.listen(3005, () => {
  console.log(`백엔드 서버 ${3005}번 포트에서 작동중.`);
});
>>>>>>> 9d415e8f8fdf9b4c77f26b9d37a1955564221aa2
