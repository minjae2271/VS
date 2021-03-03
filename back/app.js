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
