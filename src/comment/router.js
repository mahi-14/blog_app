const express = require("express");
//const { isAuthenticated } = require("../helper/utils");
const {
  createNewComment,
  ReadComment,
  updateComment,
  deleteComment,
} = require("./controllers");
const commentRouter = express.Router();

commentRouter.post("/comment", createNewComment);
commentRouter.get("/read", ReadComment);
commentRouter.put("/update", updateComment);
commentRouter.delete("/delete", deleteComment);

module.exports = { commentRouter };
