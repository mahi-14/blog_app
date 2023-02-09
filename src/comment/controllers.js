const { Comment } = require("./models");

//creating comment
const createNewComment = async (req, res) => {
  console.log(req.body);
  var newComment = (await Comment.create(req.body)).populate("user_id");

  return res.json({ status: "Created", newComment });
};

//reading comment
const ReadComment = async (req, res) => {
  console.log(req.body);
  var allComments = await Comment.find().populate("user_id");

  return res.json({ status: "all comments !!!!", allComments });
};

//update comment
const updateComment = async (req, res) => {
  var _id = req.query.id;
  var data = req.body;
  console.log(_id, data);
  var oneComment = await Comment.findById(_id);
  oneComment.comment = data.comment;
  oneComment = await oneComment.save();

  return res.json({ status: "Comment Updated", oneComment });
};

//delete comment
const deleteComment = async (req, res) => {
  var _id = req.query.id;
  console.log(_id);
  var oneComment = await Comment.findById(_id);
  await Comment.findByIdAndDelete(_id);

  return res.json({ status: "Comment Deleted", oneComment });
};

module.exports = {
  createNewComment,
  ReadComment,
  updateComment,
  deleteComment,
};
