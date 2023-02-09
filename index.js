//Auth-user,id
//blog-title,description,foreign key-user_id
//comment-comment,foreign key-user_id,blog_id

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { authRouter } = require("./src/auth/router");
const { blogRouter } = require("./src/blog/router");
const { commentRouter } = require("./src/comment/router");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//DB Connection
mongoose.connect(
  "mongodb+srv://root:mahirai@cluster0.bpf4kih.mongodb.net/blog_g16?retryWrites=true&w=majority"
  //"mongodb://127.0.0.1:27017/blog_g16"
);
`mongoose.set('strictQuery', false)`;
mongoose.connection.on("connected", () => {
  console.log("DB Connected");
});

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

//connecting frontend with backend using aws
app.get("", (req, res) => {
  //return res.send("<center>Welcome to node app</center>");
  return res.sendFile(__dirname + "/index.html");
});

app.listen(4000, () => {
  console.log("server started on 4000", __dirname); //__dirname give you path
});
