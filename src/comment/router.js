const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const {
  createNewComment,
  ReadComment,
  updateComment,
  deleteComment,
  getCommentbyUser,
  getCommentbyId,
} = require("./controllers");
const commentRouter = express.Router();

commentRouter.post("/comment", isAuthenticated, createNewComment);
commentRouter.get("/getbyuser", isAuthenticated, getCommentbyUser);
commentRouter.get("/getbyid", isAuthenticated, getCommentbyId);
commentRouter.put("/update", isAuthenticated, updateComment);
commentRouter.delete("/delete", isAuthenticated, deleteComment);

module.exports = { commentRouter };
