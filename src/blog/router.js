const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const {
  createNewBlog,
  readBlogByUserId,
  readBlogByBlogId,
  updateBlog,
  deleteBlog,
} = require("./controllers");
const blogRouter = express.Router();

blogRouter.post("/blog", isAuthenticated, createNewBlog);
blogRouter.get("/blog/:id", readBlogByUserId);
blogRouter.get("/blog", readBlogByBlogId);
blogRouter.put("/update", updateBlog);
blogRouter.delete("/delete", deleteBlog);

module.exports = { blogRouter };
