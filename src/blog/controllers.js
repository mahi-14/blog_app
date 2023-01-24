const { Blog } = require("./models");

//creating and reading blogs

const createNewBlog = async (req, res) => {
  console.log(req.body);
  //console.log(user_id);
  var newBlog = (await Blog.create(req.body)).populate("user_id");

  var allBlogs = await Blog.find().populate("user_id"); //object id
  return res.json({ status: "Created", allBlogs }); //newBlog
};

module.exports = { createNewBlog };
