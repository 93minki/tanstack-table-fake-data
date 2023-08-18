const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");

const userListRoute = require("./routes/UserList");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userList", userListRoute);

app.get("/", (req, res) => {
  res.send("hello!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("서버 에러!!");
});

app.listen(port, () => {
  console.log(`Express App on ${port}`);
});
