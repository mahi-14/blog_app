const { Blog } = require("./models");

//creating and reading blogs
const createNewBlog = async (req, res) => {
  console.log(req.body);
  //console.log(user_id);
  //var newBlog = (await Blog.create(req.body)).populate("user_id");

  var allBlogs = await Blog.find().populate("user_id"); //object id
  return res.json({ status: "Created", allBlogs }); //newBlog
};

//reading blog by user id
const readBlogByUserId = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  var oneBlog = await Blog.find({ id: id });
  return res.json({ status: "particular blog record ", data: oneBlog });
};

//reading blog by blog id
const readBlogByBlogId = async (req, res) => {
  console.log(req.body);
  var _id = req.query.id;
  var oneBlog = await Blog.findById(_id);
  return res.json({ status: "particular blog record ", oneBlog });
};

//update blogs
const updateBlog = async (req, res) => {
  var _id = req.query.id;
  var data = req.body;
  console.log(_id, data);
  var oneBlog = await Blog.findById(_id);
  oneBlog.title = data.title;
  oneBlog = await oneBlog.save();

  return res.json({ status: "Blog Updated", oneBlog });
};

//delete blogs
const deleteBlog = async (req, res) => {
  var _id = req.query.id;
  console.log(_id);
  var oneBlog = await Blog.findById(_id);
  await Blog.findByIdAndDelete(_id);

  return res.json({ status: "Blog Deleted", oneBlog });
};

module.exports = {
  createNewBlog,
  readBlogByUserId,
  readBlogByBlogId,
  updateBlog,
  deleteBlog,
};
