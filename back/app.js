const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("murpick backend");
});

app.listen(3005, () => {
  console.log(`백엔드 서버 ${3005}번 포트에서 작동중.`);
});
